import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingSection from "../components/LandingSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactMeSection from "../components/ContactMeSection";
import Alert from "../components/Alert";

const Index = () => (
  <main>
    <Header />
    <LandingSection />
    <ProjectsSection />
    <ContactMeSection />
    <Footer />
    <Alert />
  </main>
);

export default Index;
