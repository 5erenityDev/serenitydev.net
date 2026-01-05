import '../globals.css'; // Import global styles ONLY if you need Tailwind utility classes (you do)

export const metadata = {
  title: 'Stream Overlay',
  description: 'OBS Overlay',
};

export default function OverlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-transparent">
      {/* We add 'bg-transparent' to ensure OBS sees through the background 
        if you didn't set a background color in the page itself.
      */}
      <body className="bg-transparent overflow-hidden m-0 p-0">
        {children}
      </body>
    </html>
  );
}