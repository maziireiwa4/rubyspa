// components/SocialMediaLinks.js
export default function SocialMediaLinks() {
  return (
    <div className="flex space-x-4">
      <a href="https://www.facebook.com/nailthuhien999" target="_blank" rel="noreferrer">
        <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
      </a>
      <a href="https://www.instagram.com/yourpage" target="_blank" rel="noreferrer">
        <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
      </a>
      <a href="https://www.twitter.com/yourpage" target="_blank" rel="noreferrer">
        <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" />
      </a>
    </div>
  );
}
