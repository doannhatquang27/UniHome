export default interface IConversation {
  conversationId: string;
  content: string;
  houseId: string;
  houseName: string;
  time: string;
  userId: string;
  isAnswerd: boolean;
  fullName: string;
  userAvatar: string;
  parentId?: string;
}
