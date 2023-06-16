import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 403 });
  }

  const body = await req.json();
  const { title, url, description, category } = body;

  try {
    const result = await prisma.chatPrompt.create({
      data: {
        title,
        description,
        url,
        category,
        user: { connect: { email: session?.user?.email! } }
      }
    });
    return new Response(JSON.stringify(result));
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(JSON.stringify(error.issues), { status: 422 })
    // }

    // if (error instanceof RequiresProPlanError) {
    //   return new Response("Requires Pro Plan", { status: 402 })
    // }

    console.error(error);
    return new Response(null, { status: 500 });
  }
}
