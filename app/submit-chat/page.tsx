import { SubmitChatForm } from "./submit-chat-form";

const SubmitChat: React.FC = () => {
  return (
    <>
      <div className="mt-10">
        <h1 className="text-center text-3xl font-semibold">
          Tell us a bit more about this chat prompt
        </h1>
        <div className="text-center mt-4 text-gray-500">
          We’ll need chat url, title and a short description
        </div>
        <div className="mt-10">
          <SubmitChatForm />
        </div>
      </div>
    </>
  );
};

export default SubmitChat;
