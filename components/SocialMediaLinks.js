import Image from "next/image";

export default function SocialMediaLinks() {
  return (
    <div className="flex space-x-4">
      <a href="https://www.facebook.com/nailthuhien999" target="_blank" rel="noreferrer">
        <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
      </a>
      <a href="https://www.instagram.com/yourpage" target="_blank" rel="noreferrer">
        <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
      </a>
      <a href="https://www.twitter.com/yourpage" target="_blank" rel="noreferrer">
        <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
      </a>
    </div>
  );
}
