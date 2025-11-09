// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is {' '}
            <span className=" text-pink-500">{personalData.name}</span>
            {` , I'm a Professional `}
            <span className=" text-[#16f2b3]">{personalData.designation}</span>
            .
          </h1>

          <div className="my-12 flex items-center gap-5">
            <Link
              href={personalData.github}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={30} />
            </Link>
            <Link
              href={personalData.facebook}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaFacebook size={30} />
            </Link>
            <Link
              href={personalData.leetcode}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <SiLeetcode size={30} />
            </Link>
            <Link
              href={personalData.twitter}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaTwitterSquare size={30} />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {
              (() => {
                const raw = personalData.phone || '';
                const digits = raw.replace(/\D/g, '');
                const waNumber = digits.startsWith('0') ? digits.replace(/^0+/, '') : digits;
                const waHref = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I would like to connect with you.')}` : '#contact';

                return (
                  <Link href={waHref} target={waNumber ? '_blank' : undefined} rel={waNumber ? 'noreferrer' : undefined} className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
                    <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                      <span>Contact me</span>
                      <RiContactsFill size={16} />
                    </button>
                  </Link>
                );
              })()
            }

            {
              (() => {
                const resumeHref = personalData.resume || '/resume.pdf';
                const isLocal = String(resumeHref).startsWith('/');

                // If the resume is served from this site (public/), use the download attribute to force download.
                // Otherwise open in a new tab (external URL).
                return (
                  <a
                    href={resumeHref}
                    download={isLocal}
                    target={isLocal ? undefined : '_blank'}
                    rel={isLocal ? undefined : 'noreferrer'}
                    className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
                    role="button"
                  >
                    <span>Get Resume</span>
                    <MdDownload size={16} />
                  </a>
                );
              })()
            }
          </div>

        </div>
        <div className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              {
                (() => {
                  const escape = (s = "") =>
                    String(s)
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/"/g, "&quot;")
                      .replace(/'/g, "&#39;");

                  const name = escape(personalData.name);
                  const title = escape(personalData.designation);

                  const codeHtml = `
<span class="text-pink-500">const</span> <span class="text-white">coder</span> <span class="text-pink-500">=</span> <span class="text-gray-400">{</span>
  <span class="text-white">name:</span> <span class="text-gray-400">'</span><span class="text-amber-300">${name}</span><span class="text-gray-400">',</span>
  <span class="text-white">title:</span> <span class="text-gray-400">'</span><span class="text-amber-300">${title}</span><span class="text-gray-400">',</span>
  <span class="text-white">skills:</span> <span class="text-gray-400">[</span><span class="text-amber-300">'React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'TypeScript', 'Node.js', 'GitHub', 'API Integration', 'UI/UX', 'C++', 'Agile', 'UML'</span><span class="text-gray-400">],</span>
  <span class="text-white">experience:</span> <span class="text-gray-400">[</span><span class="text-amber-300">'Software Developer @ NASTP Siber Koza', '100 Days of Code @ Bytewise Ltd.'</span><span class="text-gray-400">],</span>
  <span class="text-white">hardWorker:</span> <span class="text-orange-400">true</span>,
  <span class="text-white">quickLearner:</span> <span class="text-orange-400">true</span>,
  <span class="text-white">problemSolver:</span> <span class="text-orange-400">true</span>,

  <span class="text-green-400">hireable</span>: <span class="text-orange-400">function</span>() <span class="text-gray-400">{</span>
    <span class="text-orange-400">return</span> <span class="text-gray-400">(</span>
      <span class="text-cyan-400">this.</span><span class="text-white">hardWorker</span> <span class="text-amber-300">&&</span>
      <span class="text-cyan-400">this.</span><span class="text-white">problemSolver</span> <span class="text-amber-300">&&</span>
      <span class="text-cyan-400">this.</span><span class="text-white">skills.length</span> <span class="text-amber-300">&gt;=</span> <span class="text-orange-400">8</span>
    <span class="text-gray-400">);</span>
  <span class="text-gray-400">}</span>
<span class="text-gray-400">};</span>

<span class="text-gray-400">console.log(</span><span class="text-white">coder.hireable()</span><span class="text-gray-400">);</span> <span class="text-green-400">// true</span>
`;

                  return (
                    <pre className="whitespace-pre overflow-x-auto" dangerouslySetInnerHTML={{ __html: codeHtml }} />
                  );
                })()
              }
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;