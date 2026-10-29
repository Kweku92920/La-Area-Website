"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Search, Layers, BookOpen } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

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
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTenet = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (expandedIds.length === filteredTenets.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(filteredTenets.map((t) => t.id));
    }
  };

  const filteredTenets = TENETS.filter(
    (tenet) =>
      tenet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenet.fullText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenet.scriptures.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Banner with deep blue palette */}
      <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-[#0f172a] px-6 py-20 text-white sm:min-h-[420px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_54%)]"
        />
        <div aria-hidden="true" className="absolute -right-20 -top-28 h-[34rem] w-[34rem] rounded-full border border-white/[0.08]" />
        <div aria-hidden="true" className="absolute -right-4 -top-12 h-[24rem] w-[24rem] rounded-full border border-blue-400/[0.14]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Breadcrumb Pill */}
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tenets" }]} />

          {/* Heading */}
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Our Tenets
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
            Faithful doctrines called to anchor, guide, and ground the people of God under La Area.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Controls Bar: Search & Expand All */}
        <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Foundations of Faith
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredTenets.length} of {TENETS.length} core tenets
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctrines or scriptures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              />
            </div>

            {/* Expand / Collapse All Button */}
            <button
              onClick={toggleAll}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Layers className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              {expandedIds.length === filteredTenets.length && filteredTenets.length > 0
                ? "Collapse All"
                : "Expand All"}
            </button>
          </div>
        </div>

        {/* Tenets List */}
        {filteredTenets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-800">
            <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="mt-4 font-serif text-lg font-semibold text-slate-800 dark:text-slate-200">
              No tenets found
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try adjusting your search query to find specific doctrines or verses.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTenets.map((tenet) => {
              const isExpanded = expandedIds.includes(tenet.id);
              const detailsId = `tenet-details-${tenet.id}`;

              return (
                <article
                  key={tenet.id}
                  className={`group rounded-2xl border bg-white transition-all duration-300 dark:bg-slate-900/80 ${
                    isExpanded
                      ? "border-amber-500/40 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20 dark:border-amber-500/30"
                      : "border-slate-200/80 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTenet(tenet.id)}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:items-center sm:p-6"
                  >
                    <div className="flex items-start gap-4 sm:items-center sm:gap-6">
                      {/* Number Badge */}
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 font-serif text-base font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 sm:h-12 sm:w-12 sm:text-lg">
                        {String(tenet.id).padStart(2, "0")}
                      </span>

                      {/* Image Thumbnail */}
                      <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-sm dark:bg-slate-800 sm:w-28">
                        <Image
                          src={tenet.image}
                          alt={tenet.title}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 80px, 112px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Title & Scripture Pills */}
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-lg font-bold text-slate-900 transition-colors group-hover:text-amber-800 dark:text-slate-100 dark:group-hover:text-amber-300 sm:text-xl">
                          {tenet.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {tenet.scriptures.map((scripture) => (
                            <span
                              key={scripture}
                              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 transition group-hover:bg-amber-50 group-hover:text-amber-800 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-amber-950/40 dark:group-hover:text-amber-300"
                            >
                              {scripture}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Chevron Indicator Button */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isExpanded
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700"
                      }`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Smooth Accordion Height Expansion */}
                  <div
                    id={detailsId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-6 pt-4 dark:border-slate-800/80 sm:px-6 sm:pb-8">
                        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/50 p-4 dark:bg-amber-950/20 sm:p-5">
                          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                            {tenet.fullText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
