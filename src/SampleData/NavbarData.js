import ContactPageIcon from "@mui/icons-material/ContactPage";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import EventIcon from "@mui/icons-material/Event";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmailIcon from "@mui/icons-material/Email";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

export const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Blogs",
    title: "Blogs",
    icon: <BookIcon />,
    children: [
      {
        segment: "AllBlogs",
        title: "All Blogs",
        icon: <DescriptionIcon />,
      },
      {
        segment: "CreateBlog",
        title: "Create Blog",
        icon: <PostAddIcon />,
      },
    ],
  },
  {
    segment: "Events",
    title: "Events",
    icon: <EventIcon />,
    children: [
      {
        segment: "AllEvents",
        title: "All Events",
        icon: <EventAvailableIcon />,
      },
      {
        segment: "EventSurvey",
        title: "Event Survey",
        icon: <EventAvailableIcon />,
      },
      {
        segment: "CreateEvent",
        title: "Create Event",
        icon: <PostAddIcon />,
      },
    ],
  },
  {
    segment: "Users",
    title: "Users",
    icon: <PeopleIcon />,
  },
  {
    segment: "Contacts",
    title: "Contacts",
    icon: <ContactPageIcon />,
  },
  {
    segment: "EventRegisterUsers",
    title: "Register Users",
    icon: <PeopleIcon />,
  },
  {
    segment: "StudyJam",
    title: "StudyJam",
    icon: <SchoolIcon />,
  },
  {
    kind: "header",
    title: "HackOn 2025",
  },
  {
    segment: "Hack-On",
    title: "Hack-On",
    icon: <WorkIcon />,
  },
  {
    segment: "Hack-On/Coupons",
    title: "Coupons & Offers",
    icon: <LocalOfferIcon />,
  },
  {
    segment: "Hack-On/HackOnTimer",
    title: "HackOn Clock",
    icon: <LocalOfferIcon />,
  },
  {
    kind: "header",
    title: "Storage",
  },
  {
    segment: "Storage",
    title: "Storage",
    icon: <StorageIcon />,
    children: [
      {
        segment: "Documents",
        title: "All Documents",
        icon: <FolderIcon />,
      },
      {
        segment: "Images",
        title: "All Images",
        icon: <ImageIcon />,
      },
    ],
  },
  {
    kind: "header",
    title: "Marketing",
  },
  {
    segment: "SendCusEmail",
    title: "Send Email",
    icon: <EmailIcon />,
  },
  {
    segment: "SendCusEmail",
    title: "Email Template",
    icon: <EmailIcon />,
    children: [
      {
        segment: "SponsershipEmail",
        title: "Sponsorship Email",
        icon: <DescriptionIcon />,
      },
    ],
  },
];
