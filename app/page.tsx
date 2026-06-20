import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Products from '@/components/Products';
import Countdown from '@/components/Countdown';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Nav />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Ticker Marquee */}
        <Ticker />

        {/* Products Section */}
        <Products />

        {/* Launch Status / Countdown Waitlist Banner */}
        <Countdown />

        {/* Services Section */}
        <Services />

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Keyboard-accessible Command Palette */}
      <CommandPalette />
    </>
  );
}
