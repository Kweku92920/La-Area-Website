// app/tenets/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Tenet {
  id: number;
  title: string;
  scriptures: string[];
  fullText: string;
  image: string;
}

const TENETS: Tenet[] = [
  {
    id: 1,
    title: "The Bible",
    scriptures: ["2 Timothy 3:16-17", "2 Peter 1:20-21"],
    fullText: "We believe in the divine inspiration and authority of the Holy Scriptures. The Bible is infallible, inerrant, and the final authority for faith, doctrine, and living.",
    image: "/bible.jpg"
  },
  {
    id: 2,
    title: "The Trinity",
    scriptures: ["Matthew 28:19", "2 Corinthians 13:14", "1 John 5:7"],
    fullText: "We believe in the Unity of the Godhead and the Trinity of Persons therein: God the Father, God the Son, and God the Holy Spirit, equal in power and glory.",
    image: "/trinity.jpg"
  },
  {
    id: 3,
    title: "Jesus Christ",
    scriptures: ["John 1:1-14", "1 Corinthians 15:3-4", "Hebrews 4:15"],
    fullText: "We believe in the deity of Jesus Christ, His virgin birth, His sinless life, His miracles, His vicarious and atoning death through His shed blood, His bodily resurrection, and His ascension to the right hand of the Father.",
    image: "/Jesus.jpg"
  },
  {
    id: 4,
    title: "The Fall & Salvation of Man",
    scriptures: ["Romans 3:23", "Ephesians 2:8-9", "Titus 3:5"],
    fullText: "We believe all humanity was created good but fell into sin by voluntary transgression. Salvation is received through repentance toward God and faith toward our Lord Jesus Christ.",
    image: "/salvation.jpg"
  },
  {
    id: 5,
    title: "Ordinances of the Church",
    scriptures: ["Matthew 28:19", "Acts 2:38", "1 Corinthians 11:23-26"],
    fullText: "We believe in Water Baptism by immersion in the name of the Father, Son, and Holy Spirit for believers, and the observance of the Lord's Supper as a remembrance of Christ's sacrifice.",
    image: "/Ordinances.jpg"
  },
  {
    id: 6,
    title: "Baptism in the Holy Spirit",
    scriptures: ["Acts 2:4", "Acts 10:44-46", "Acts 19:6"],
    fullText: "We believe in the Baptism in the Holy Spirit with the initial physical evidence of speaking in other tongues as the Spirit gives utterance, endowing believers with power for life and service.",
    image: "/HSpirit.jpg"
  },
  {
    id: 7,
    title: "Sanctification",
    scriptures: ["1 Thessalonians 4:3", "Hebrews 12:14", "1 Peter 1:15-16"],
    fullText: "We believe that sanctification is an act of separation from that which is evil, and of dedication unto God, realized through faith in Jesus Christ and obedience to the Word.",
    image: "/sanctification.jpg"
  },
  {
    id: 8,
    title: "Divine Healing",
    scriptures: ["Isaiah 53:4-5", "Matthew 8:16-17", "James 5:14-16"],
    fullText: "We believe divine healing is provided for all in the Atonement of Christ and is the privilege of all believers through the prayer of faith.",
    image: "/healing.jpg"
  },
  {
    id: 9,
    title: "The Second Coming of Christ",
    scriptures: ["1 Thessalonians 4:16-17", "Titus 2:13", "Revelation 1:7"],
    fullText: "We believe in the personal, premillennial, and imminent return of our Lord Jesus Christ to gather His Saints and establish His kingdom.",
    image: "/coming.jpg"
  },
  {
    id: 10,
    title: "The Final Judgment",
    scriptures: ["Matthew 25:46", "Revelation 20:11-15"],
    fullText: "We believe there will be a final judgment in which the wicked dead will be raised and judged according to their works, receiving everlasting punishment in the Lake of Fire.",
    image: "/judgement.jpg"
  },
  {
    id: 11,
    title: "The New Heavens & New Earth",
    scriptures: ["2 Peter 3:13", "Revelation 21:1-4"],
    fullText: "We look forward according to His promise for new heavens and a new earth, wherein dwelleth righteousness, and God will dwell with His people forever.",
    image: "/he.jpg"
  }
];

export default function TenetsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleTenet = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="text-slate-800">
      <section className="relative flex min-h-[370px] items-center justify-center overflow-hidden bg-[#1C0D0D] px-5 py-16 text-white sm:min-h-[410px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,134,11,0.24),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(139,38,33,0.38),transparent_48%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1C0D0D]/35 via-[#1C0D0D]/20 to-[#1C0D0D]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-amber-200/[0.08]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-200 backdrop-blur-md sm:text-xs">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span className="text-white">Tenets</span>
          </div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
            The Church of Pentecost · LA Area
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Our Tenets
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            The core beliefs and doctrines of The Church of Pentecost, rooted in Scripture and the power of the Holy Spirit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <div className="mb-8 flex flex-col gap-3 border-b border-[#1C0D0D]/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              What We Believe
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1C0D0D] sm:text-4xl">
              Foundations of our faith
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-stone-600">
            Explore each doctrine and the Scripture passages that shape our faith.
          </p>
        </div>

        <div className="border-t border-stone-200">
          {TENETS.map((tenet) => {
            const isExpanded = expandedId === tenet.id;
            const detailsId = `tenet-details-${tenet.id}`;

            return (
              <article key={tenet.id} className="border-b border-stone-200">
                <button
                  type="button"
                  onClick={() => toggleTenet(tenet.id)}
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  className="group grid w-full grid-cols-[2.25rem_6rem_minmax(0,1fr)_1.5rem] items-center gap-3 py-5 text-left sm:grid-cols-[3.5rem_10rem_minmax(0,1fr)_2rem] sm:gap-5 sm:py-6"
                >
                  <span className="font-serif text-lg font-semibold tabular-nums text-amber-700/80 sm:text-2xl">
                    {String(tenet.id).padStart(2, "0")}
                  </span>

                  <span className="relative aspect-[4/3] overflow-hidden rounded-md bg-stone-200">
                    <Image
                      src={tenet.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 96px, 160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-serif text-lg font-semibold leading-snug text-[#1C0D0D] transition-colors group-hover:text-amber-800 sm:text-2xl">
                      {tenet.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                      {tenet.scriptures.map((scripture) => (
                        <span
                          key={scripture}
                          className="text-[10px] font-medium text-stone-500 sm:text-xs"
                        >
                          {scripture}
                        </span>
                      ))}
                    </span>
                  </span>

                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 justify-self-end text-stone-400 transition-transform duration-300 group-hover:text-amber-700 ${
                      isExpanded ? "rotate-180 text-amber-700" : ""
                    }`}
                  />
                </button>

                <div
                  id={detailsId}
                  hidden={!isExpanded}
                  className="grid grid-cols-[2.25rem_6rem_minmax(0,1fr)_1.5rem] gap-3 pb-6 sm:grid-cols-[3.5rem_10rem_minmax(0,1fr)_2rem] sm:gap-5 sm:pb-8"
                >
                  <div className="col-start-3 border-l-2 border-amber-500/50 pl-4 sm:pl-5">
                    <p className="text-sm leading-7 text-stone-700 sm:text-base">
                      {tenet.fullText}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}