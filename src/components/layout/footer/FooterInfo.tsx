/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from "next/image";
import Link from "next/link";
import { clsxm } from "@/lib/helper";
import OwnerName from "./OwnerName";

const defaultLinkSections = [
  {
    name: "Mis redes sociales",
    links: [
      {
        name: "GitHub",
        href: "https://github.com/Dalvae/",
        external: true, // Indica que este enlace es externo
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/diego-alvarez-espinoza/",
        external: true, // Indica que este enlace es externo
      },
    ],
  },
];

export const FooterInfo = () => {
  return (
    <>
      <div className="relative">
        <FooterLinkSection />
      </div>

      <FooterBottom />
    </>
  );
};

const FooterLinkSection = () => {
  const footerConfig = {
    linkSections: defaultLinkSections,
  };

  return (
    <div className="space-x-0 space-y-3 md:space-x-6 md:space-y-0">
      {footerConfig.linkSections.map((section: any) => {
        return (
          <div className="block space-x-4 md:inline-flex" key={section.name}>
            <b className="font-medium">{section.name}</b>
            <span className="space-x-4 text-neutral-content/90">
              {section.links.map((link: any) => {
                return (
                  <StyledLink
                    external={link.external}
                    className="link-hover link"
                    href={link.href}
                    key={link.name}
                  >
                    {link.name}
                  </StyledLink>
                );
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const StyledLink = (props: any) => {
  const { external, ...rest } = props;
  const As = external ? "a" : Link;

  return (
    <As
      className="link-hover link"
      target={props.external ? "_blank" : props.target}
      {...rest}
    >
      {props.children}
    </As>
  );
};
const Divider = ({ className }: { className?: string }) => {
  return (
    <span className={clsxm("select-none whitespace-pre opacity-50", className)}>
      {" | "}
    </span>
  );
};

const PoweredBy = ({ className }: { className: string }) => {
  return (
    <span className={className}>
      <Divider />
      <StyledLink href="https://github.com/dalvae" target="_blank">
        Dalvae
      </StyledLink>
      .
    </span>
  );
};

const FooterBottom = () => {
  const footerConfig: any = {};
  const currentYear = new Date().getFullYear().toString();
  const { date = currentYear, icp }: any = footerConfig.otherInfo || {};

  return (
    <div className="mt-12 space-y-3 text-center md:mt-6 md:text-left">
      <p>
        <span>© {date.replace("{{now}}", currentYear)} </span>
        <a href="/">
          <OwnerName />
        </a>
        <span>.</span>
        <span>
          <Divider />
          <a href="/feed" target="_blank">
            RSS
          </a>
          <Divider />
          <a href="/sitemap.xml" target="_blank">
            Sitemap
          </a>
          <Divider className="inline" />
        </span>
      </p>
      <p>
        <PoweredBy className="my-3 block md:my-0 md:inline" />
        {icp && (
          <>
            <Divider className="hidden md:inline" />
            <StyledLink href={icp.link} target="_blank" rel="noreferrer">
              {icp.text}
            </StyledLink>
          </>
        )}
      </p>
    </div>
  );
};
