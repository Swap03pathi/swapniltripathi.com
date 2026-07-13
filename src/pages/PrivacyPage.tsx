import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '../components/Seo';
import Footer from '../components/Footer';

const PRIVACY_MD = `
**Effective date: July 14, 2026**

This policy covers **swapniltripathi.com** ("the site"), the personal website of Swapnil
Tripathi.

## The short version

This is a personal portfolio and blog. You don't need an account, the site has no signup forms,
and I collect as little as possible. The complete picture is below.

## Information the site collects

- **Nothing directly.** The main site has no accounts, forms, or databases storing your data.
- **Hosting logs.** Like nearly every website, the hosting provider records standard server logs
  (IP address, browser user-agent, pages requested) for security and operations, retained
  according to the provider's own policy.
- **When you contact me** by email, WhatsApp, or LinkedIn, that conversation is governed by
  those platforms' policies. I keep correspondence private and don't share it.

## Advertising and cookies (Google AdSense)

This site uses Google AdSense to show ads on some pages.

- Third-party vendors, including Google, use cookies to serve ads based on your prior visits to
  this website or other websites.
- Google's use of advertising cookies (including the DoubleClick cookie) enables it and its
  partners to serve ads to you based on your visits to this site and/or other sites on the
  Internet.
- You can opt out of personalized advertising at
  [Google Ads Settings](https://adssettings.google.com) or
  [www.aboutads.info/choices](https://www.aboutads.info/choices).
- Where required by law, consent is requested before personalized ads are shown.

## Analytics

The site currently runs **no analytics tools**. If that ever changes, this policy will be
updated first.

## Embedded content

Some pages embed third-party content (for example, YouTube videos). Embedded content behaves as
if you visited the third-party site directly and may set its own cookies.

## Demo applications

Interactive demos hosted under \`/app/*\` (for example, the surveillance demo) have their own
login systems. Data submitted there is used only to operate the demo, is never sold or shared,
and is deleted on request.

## Your rights

Email **swapniltripathi2905@gmail.com** to ask what data (if any) is connected to you, or to
request deletion. Access and deletion requests in the spirit of the GDPR and CCPA are honored
regardless of where you live.

## Children

The site is not directed at children under 13 and knowingly collects no data from them.

## Changes

Updates will be posted on this page with a new effective date.

## Contact

Questions about this policy: **swapniltripathi2905@gmail.com**.
`;

export default function PrivacyPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="Privacy Policy — Swapnil Tripathi"
        description="How swapniltripathi.com handles cookies, advertising, and your data."
        path="/privacy"
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{PRIVACY_MD}</Markdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
