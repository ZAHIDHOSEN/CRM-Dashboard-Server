import { IMessage } from "./message.interface"
import { Message } from "./message.model"



const sendMessage = async(payload:Partial<IMessage>)=>{
    const result = await Message.create(payload)
    return result
}


const getMessages = async (user1: string, user2: string, organizationId: string) => {
  const result = await Message.find({
    organization: organizationId,
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ createdAt: 1 }); 

  
  await Message.updateMany(
    { receiver: user1, sender: user2, isRead: false },
    { $set: { isRead: true } }
  );

  return result;
};





export const MessageServices = {
  sendMessage,
  getMessages
}