import Image from "next/image";
import Link from "next/link";
//ICONS
import GitHubIcon from "../../public/assets/icons/github-142-svgrepo-com.svg";

export default function Footer() {
  return (
    <div className="flex gap-4 mt-16 lg:flex-row flex-col">
      <div className="flex flex-col justify-between gap-4 lg:max-w-[380px]">
        <div className="logo">LootBox Labs</div>
        <div className="">
          <Link
            href={"https://github.com/tylerhaisman/lootbox-labs"}
            target="_blank"
          >
            <Image src={GitHubIcon} alt="GitHubIcon" className="w-5"></Image>
          </Link>
          <p className="mt-2">
            © 2025 Lootbox Labs @ University of Florida. All Rights Reserved.
          </p>
        </div>
      </div>
      <div className="w-[1px] bg-black/10 rounded-md mx-6"></div>
      <div className="flex-1 flex gap-4 justify-between lg:flex-row flex-col">
        <div className="flex flex-col gap-4">
          <h2>Features</h2>
          <Link
            href="/allboxes"
            className="cursor-pointer no-underline hover:underline"
          >
            <p>All Boxes</p>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h2>About</h2>
          <p>About Us</p>
          <p>Contact Us</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2>Legal</h2>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
