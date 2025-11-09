// @flow strict
import { certifications } from "@/utils/data/certifications";
import Image from "next/image";
import GlowCard from "../../helper/glow-card";

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Section"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Licenses & Certifications
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {certifications.map((cert, idx) => (
            <GlowCard key={`cert-${idx}`} identifier={`cert-${idx}`}>
              <div className="p-4 relative text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-[#16f2b3]">{cert.issueDate}</p>
                    <p className="text-base sm:text-lg mb-2 font-medium">{cert.title}</p>
                    <p className="text-sm text-gray-300 mb-2">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills?.map((s, i) => (
                        <span key={i} className="text-xs bg-[#0f1724] px-2 py-1 rounded text-gray-300">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {cert.credentialUrl ? (
                      <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-sm text-violet-400 hover:underline ml-4">View Credential</a>
                    ) : (
                      <span className="text-sm text-gray-500 ml-4">No link</span>
                    )}
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
