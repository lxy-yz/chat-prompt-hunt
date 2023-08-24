import { v4 as uuid } from 'uuid';
import { authOptions, getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { chatPromptPatchSchema } from '@/lib/validations';
import * as z from 'zod';
import slugify from 'slugify';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await hasAccess(params.id))) {
      return new Response(null, { status: 403 });
    }

    await prisma.chatPrompt.delete({
      where: {
        id: params.id
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'deleted'
      }),
      {
        status: 204
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await hasAccess(params.id))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = chatPromptPatchSchema.parse(json);

    let slug = slugify(body.title, { lower: true });
    const existingPost = await prisma.chatPrompt.findUnique({
      where: {
        slug
      }
    });
    if (existingPost) {
      const uniqueId = uuid().slice(0, 4);
      slug += `-${uniqueId}`;
    }

    const result = await prisma.chatPrompt.update({
      where: {
        id: params.id
      },
      data: {
        slug,
        title: body.title,
        description: body.description,
        url: body.url,
        topic: body.topic
      }
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function hasAccess(id: string) {
  const session = await getSession();
  const count = await prisma.chatPrompt.count({
    where: {
      id,
      submittedById: session?.user.id
    }
  });

  return count > 0;
}
