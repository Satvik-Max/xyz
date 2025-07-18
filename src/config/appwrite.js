import { Client, Account, Databases, Storage } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_PROJECTID);

export const GDGCDatabase = process.env.NEXT_PUBLIC_DATABASEID;
export const TshirtSizeCollection = process.env.NEXT_PUBLIC_TSHIRTSIZECOLLID;
export const BlogsCollection = process.env.NEXT_PUBLIC_BLOGS_ID;
export const UsersCollection = process.env.NEXT_PUBLIC_USERS_ID;
export const EventsCollection = process.env.NEXT_PUBLIC_EVENTS_ID;
export const ContactsCollection = process.env.NEXT_PUBLIC_CONTACT_ID;
export const EventRegistrationID = process.env.NEXT_PUBLIC_EVENTREGISTRATION_ID;
export const StudentDistribution = process.env.NEXT_PUBLIC_STUDENT_DISTRO;

export const GDGCImagesStorageBucket = process.env.NEXT_PUBLIC_IMAGES_BUCKET_ID;
export const GDGCFilesStorageBucket = process.env.NEXT_PUBLIC_FILES_BUCKET_ID;
export const HackOnTeamsCollection = process.env.NEXT_PUBLIC_HACK_ON_TEAMS;
export const HackOnMembersCollection = process.env.NEXT_PUBLIC_HACK_ON_MEMBERS;
export const CoupansCollection = process.env.NEXT_PUBLIC_COUPANS;
export const TeamValidationCollection = process.env.NEXT_PUBLIC_TEAM_VALIDATION;
export const TeamScoreCollection = process.env.NEXT_PUBLIC_TEAM_SCORE;
export const HackOnTimerCollection = process.env.NEXT_PUBLIC_HACKON_TIMER;
export const EventSurveyCollection = process.env.NEXT_PUBLIC_KANAN_SURVEY;
export const UserAccount = new Account(client);
export const AppwriteDatabase = new Databases(client);
export const StorageBucket = new Storage(client);

export { ID } from "appwrite";
