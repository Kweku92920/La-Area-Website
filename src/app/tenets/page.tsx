"use client";

import Image from "next/image";
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
    scriptures: ["2 Timothy 3:16", "2 Peter 1:21"],
    fullText: "We believe in the divine inspiration and authority of the Holy Scriptures. We believe that the Bible is infallible in its declaration, final in its authority, all-sufficient in its provisions and comprehensive in its sufficiency (2 Timothy 3:16; 2 Peter 1:21).",
    image: "/bible.jpg"
  },
  {
    id: 2,
    title: "The One True God",
    scriptures: ["Genesis 1:1", "Matthew 3:16-17", "Matthew 28:19", "2 Corinthians 13:14"],
    fullText: "We believe in the existence of the One True God, Elohim, Maker of the whole universe; indefinable, but revealed as Triune Godhead- Father, Son and Holy Spirit-One in nature, essence and attributes; Omniscient, Omnipotent and Omnipresent (Genesis 1:1; Mathew 3:16-17; 28:19; 2 Corinthians 13:14).",
    image: "/trinity.jpg"
  },
  {
    id: 3,
    title: "The Depraved Nature of Humanity",
    scriptures: ["Genesis 3:1-19", "Isaiah 53:6", "Romans 3:23", "Romans 6:23", "Acts 2:38", "John 3:3, 5", "Titus 3:5"],
    fullText: "We believe that “all have sinned and come short of the glory of God” (Genesis 3:1-19; Isaiah 53:6; Romans 3:23), and are subject to eternal punishment (Matthew 13:41, 42; Romans 6:23), and need Repentance (Acts 2:38; Matthew 4:17; Acts 20:21) and Regeneration (John 3:3,5; Titus 3:5).",
    image: "/salvation.jpg"
  },
  {
    id: 4,
    title: "The Savior",
    scriptures: ["Matthew 1:21", "John 1:1", "Hebrews 4:15", "1 Corinthians 15", "Acts 1:9-11", "Romans 8:34", "Revelation 22:12"],
    fullText: "We believe that humanity’s need of a Savior has been met in the person of Jesus Christ (Matthew 1:21; John 4:42; Acts 2:36; Ephesians 5:23; Philippians 2:6-1 1), because of His Deity (Isaiah 9:6; John 1:1; John 20:38; Romans 9:5; Titus 2:13,14), Virgin Birth (Isaiah 7:14; Matthew 1:18; Luke 1:25-27), Sinless Life (John 8:46; Hebrews 4:15; 2 Corinthians 5:21), Atoning Death (Romans 3:25; Hebrews 9:22; 1 John 2:2), Resurrection (Matthew 28:5-7; Acts 2:24; Acts 2:36; Acts 10:39,40; 1 Corinthians 15: and Ascension (Acts 1:9-11; Acts 2:33-36), His Abiding Intercession (Romans 8:34; Hebrews 7:25) and His Second Coming to judge the living and the dead (Acts 1:11; Acts 10:42: 1 Thessalonians 4:16-18; 2 timothy 4:I: Revelation 22:12, 20).",
    image: "/Jesus.jpg"
  },
  {
    id: 5,
    title: "Repentance, Justification and Sanctification",
    scriptures: ["Luke 15:7", "Acts 2:38", "Romans 5:1", "1 Corinthians 6:11", "John 17:2-3", "1 John 5:11-13"],
    fullText: "We believe all humanity have to repent of and confess their sins before God (Luke 15:7; Acts 2:38; Acts 3:19; Acts 17:30), and believe in the vicarious death of Jesus Christ to be justified before God (Romans 425: Romans 5:1) We believe in the sanctification of the believer through the working of the Holy Spirit (I Corinthians 1:30: 1 Corinthians 6:11) and in God’s gift or eternal life to the believer (John 17:2,3; John 10:27; Romans 6:23b; 1 John 5:11-13).",
    image: "/sanctification.jpg"
  },
  {
    id: 6,
    title: "The Ordinances of Baptism and the Lord’s Supper",
    scriptures: ["Matthew 3:16", "Matthew 28:19", "Mark 10:13-16", "Luke 22:19-20", "1 Corinthians 11:23-33"],
    fullText: "We believe in the ordinance of Baptism by immersion as a testimony of a convert who has attained a responsible age of about 13 years (Matthew 3:16; Matthew 28:19; Mark 1:9, 10; Mark 16:16; Acts 2:38). Infants and children are not baptized but are dedicated to the Lord (Mark 10:13-16; Luke 2:22-24,34). We believe in the ordinance of the Lord’s Supper or Holy Communion, which should be partaken by all members who are in full fellowship (Luke 22:19-20; Acts 20:7; 1 Corinthians 11:23-33).",
    image: "/Ordinances.jpg"
  },
  {
    id: 7,
    title: "Baptism, Gifts and Fruits of the Holy Spirit",
    scriptures: ["Mark 16:17", "Acts 2:4", "1 Corinthians 12:8-11", "Galatians 5:22-23"],
    fullText: "We believe in the baptism of the Holy Spirit for believers with signs following; also in the operation of the gifts and the fruit of the Holy Spirit in the lives of believers (Mark 16:17 Acts 2:4;1 Corinthians 12:8-11; Galatians 5:22-23).",
    image: "/HSpirit.jpg"
  },
  {
    id: 8,
    title: "Tithes and Offering",
    scriptures: ["Genesis 14:18-20", "Malachi 3:6-10", "Matthew 23:23", "Acts 20:35", "2 Corinthians 9:1-9"],
    fullText: "We believe in tithing and in the giving of free-will offerings towards the cause of carrying forward the Kingdom of God. We believe that God blesses a cheerful giver (Genesis 14:18-20; 28:20-22; Malachi 3:6-10; Mathew 23:23; Acts 20:35; 1 Corinthians 16:1-3;2 Corinthians 9:1-9).",
    image: "/tithes.jpg"
  },
  {
    id: 9,
    title: "Divine Healing",
    scriptures: ["Isaiah 53:4-5", "2 Kings 20", "Luke 10:34", "Colossians 4:14", "James 5:14-16"],
    fullText: "We believe that the healing of sickness and disease is provided for God’s people in the atonement. The Church is, however, not opposed to soliciting the help of qualified medical practitioners (2 Kings 20:.; Matthew y: I z, Luke 1 0:34, Colossians 4:14)",
    image: "/healing.jpg"
  },
  {
    id: 10,
    title: "The Second Coming and the Next Life",
    scriptures: ["Mark 13:26", "Daniel 12:2", "John 5:28-29", "Acts 1:11", "Romans 2:7-11"],
    fullText: "We believe in the Second Coming of Christ and the Resurrection of the dead, both the saved and the unsaved – they that are saved, to the resurrection of life; and the unsaved, to the resurrection of damnation (Mark 13: 26; Daniel 12:2; John 5: 28-29; Acts 1:11; 10:42; Romans 2:7-11; 6:23).",
    image: "/coming.jpg"
  },
  {
    id: 11,
    title: "Marriage and Family",
    scriptures: ["Genesis 2:18, 21-25", "Matthew 19:4-6", "1 Corinthians 7:1-2"],
    fullText: "We believe in the institution of marriage as a union established and ordained by God for the lifelong, intimate relationship between a man as husband and a woman as wife as biologically defined at birth. We believe that God instituted marriage primarily for mutual help, fellowship and comfort that one ought to have for the other and for honorable procreation of children, and their training in love, obedience to the Lord and responsible citizenship. (Genesis 2:18, 21-25; Matthew 19:4-6: 1 Corinthians 741-2).",
    image: "/marriage.jpg"
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
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              />
            </div>

            {/* Expand / Collapse All Button */}
            <button
              onClick={toggleAll}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Layers className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
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
                      ? "border-yellow-500/40 shadow-lg shadow-yellow-500/5 ring-1 ring-yellow-500/20 dark:border-yellow-500/30"
                      : "border-slate-200/80 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTenet(tenet.id)}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    className="flex w-full flex-col gap-4 p-4 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
                  >
                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                      {/* Number Badge (Desktop) */}
                      <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 font-serif text-lg font-bold text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300 sm:flex">
                        {String(tenet.id).padStart(2, "0")}
                      </span>

                      {/* Large Responsive Image */}
                      <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm dark:bg-slate-800 sm:h-28 sm:w-44 md:h-32 md:w-52">
                        <Image
                          src={tenet.image}
                          alt={tenet.title}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, 208px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent sm:hidden" />
                        {/* Number Badge (Mobile Overlay) */}
                        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f172a]/85 font-serif text-sm font-bold text-yellow-300 shadow-md backdrop-blur-sm sm:hidden">
                          {String(tenet.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title, Scripture Pills & Mobile Chevron */}
                      <div className="flex w-full items-start justify-between gap-3 sm:block">
                        <div className="space-y-2">
                          <h3 className="font-serif text-xl font-bold text-slate-900 transition-colors group-hover:text-yellow-800 dark:text-slate-100 dark:group-hover:text-yellow-300 sm:text-2xl">
                            {tenet.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {tenet.scriptures.map((scripture) => (
                              <span
                                key={scripture}
                                className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition group-hover:bg-yellow-50 group-hover:text-yellow-800 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-yellow-950/40 dark:group-hover:text-yellow-300"
                              >
                                {scripture}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Chevron Indicator (Mobile) */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:hidden ${
                            isExpanded
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Chevron Indicator Button (Desktop) */}
                    <div
                      className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:flex ${
                        isExpanded
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
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
                        <div className="rounded-xl border-l-4 border-yellow-500 bg-yellow-50/50 p-4 dark:bg-yellow-950/20 sm:p-5">
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
