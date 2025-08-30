"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    SlidersHorizontal,
    Bookmark,
    PlayCircle,
    Star,
    Clock,
    Globe,
    Layers,
    GraduationCap,
    X,
} from "lucide-react";

// shadcn/ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ---- Mock Data (replace with API) --------------------------------------
const MOCK_COURSES = [
    {
        id: "c1",
        title: "Full‑Stack Web Development with Node.js & React",
        category: "Web Development",
        level: "Beginner",
        language: "English",
        lessons: 120,
        durationHours: 38,
        rating: 4.7,
        learners: 12800,
        price: 0,
        tags: ["HTML", "CSS", "JavaScript", "MongoDB"],
    },
    {
        id: "c2",
        title: "Data Science Essentials with Python & Pandas",
        category: "Data Science",
        level: "Intermediate",
        language: "English",
        lessons: 96,
        durationHours: 30,
        rating: 4.6,
        learners: 8600,
        price: 1499,
        tags: ["Python", "Pandas", "EDA", "Matplotlib"],
    },
    {
        id: "c3",
        title: "Android App Development with Kotlin",
        category: "Mobile Development",
        level: "Beginner",
        language: "Hindi",
        lessons: 85,
        durationHours: 26,
        rating: 4.5,
        learners: 5400,
        price: 0,
        tags: ["Kotlin", "Android Studio", "UI"],
    },
    {
        id: "c4",
        title: "Mastering Next.js 15 for Production",
        category: "Web Development",
        level: "Advanced",
        language: "English",
        lessons: 75,
        durationHours: 22,
        rating: 4.8,
        learners: 4100,
        price: 1999,
        tags: ["Next.js", "SSR", "Edge", "Auth"],
    },
    {
        id: "c5",
        title: "Intro to Machine Learning",
        category: "Data Science",
        level: "Beginner",
        language: "English",
        lessons: 60,
        durationHours: 18,
        rating: 4.4,
        learners: 9800,
        price: 0,
        tags: ["ML", "scikit‑learn", "Supervised"],
    },
    {
        id: "c6",
        title: "Flutter from Zero to Hero",
        category: "Mobile Development",
        level: "Intermediate",
        language: "English",
        lessons: 110,
        durationHours: 34,
        rating: 4.6,
        learners: 7700,
        price: 1299,
        tags: ["Flutter", "Dart", "State"],
    },
    {
        id: "c7",
        title: "Ethical Hacking Fundamentals",
        category: "Cybersecurity",
        level: "Beginner",
        language: "English",
        lessons: 70,
        durationHours: 20,
        rating: 4.3,
        learners: 6200,
        price: 0,
        tags: ["Networking", "Linux", "Recon"],
    },
    {
        id: "c8",
        title: "DevOps with Docker & Kubernetes",
        category: "DevOps",
        level: "Advanced",
        language: "English",
        lessons: 88,
        durationHours: 28,
        rating: 4.7,
        learners: 6900,
        price: 1799,
        tags: ["Docker", "K8s", "CI/CD"],
    },
];

const CATEGORIES = [
    "All",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Cybersecurity",
    "DevOps",
    "AI & ML",
    "Cloud",
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const LANGUAGES = ["All", "English", "Hindi"];

// ---- Utilities ---------------------------------------------------------
const formatPrice = (p: number) => (p === 0 ? "Free" : `₹${p.toLocaleString("en-IN")}`);

const shimmer = "after:absolute after:inset-0 after:rounded-2xl after:animate-pulse";

export interface Course {
    id: string;
    title: string;
    category: string;
    level: string; // 🔥 ab koi bhi string chalegi
    language: string;
    lessons: number;
    durationHours: number;
    rating: number;
    learners: number;
    price: number;
    tags: string[];
}


// ---- Components --------------------------------------------------------
function CourseCard({ course, onPreview }: { course: Course; onPreview: (c: Course) => void }) {
    return (
        <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="overflow-hidden group">
                <div className={`relative aspect-video bg-muted ${shimmer}`} />
                <CardHeader className="gap-1">
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-lg leading-snug">{course.title}</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="icon" variant="ghost" aria-label="Save to wishlist" className="shrink-0">
                                        <Bookmark className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent >Save</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">{course.category}</Badge>
                        <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {course.rating}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.durationHours}h</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                        {course.tags.slice(0, 4).map((t: string) => (
                            <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-sm">{course.level} • {course.language}</div>
                    <div className="flex items-center gap-2">
                        <div className="font-medium">{formatPrice(course.price)}</div>
                        <Button onClick={() => onPreview(course)}>
                            <PlayCircle className="mr-2 h-4 w-4" /> Preview
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

interface FilterBarProps {
    q: string;
    setQ: (v: string) => void;
    category: string;
    setCategory: (v: string) => void;
    level: string;
    setLevel: (v: string) => void;
    language: string;
    setLanguage: (v: string) => void;
    price: string;
    setPrice: (v: string) => void;
    sort: string;
    setSort: (v: string) => void;
    activeTags: string[];
    removeTag: (tag: string) => void;
}

function FilterBar({
    q,
    setQ,
    category,
    setCategory,
    level,
    setLevel,
    language,
    setLanguage,
    price,
    setPrice,
    sort,
    setSort,
    activeTags,
    removeTag,
}: FilterBarProps) {
    return (
        <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search courses, skills, instructors…"
                            className="pl-9"
                        />
                    </div>

                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={level} onValueChange={setLevel}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            {LEVELS.map((l) => (
                                <SelectItem key={l} value={l}>
                                    {l}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((l) => (
                                <SelectItem key={l} value={l}>
                                    {l}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={price} onValueChange={setPrice}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Free">Free</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                        </SelectContent>
                    </Select>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSort("relevance")}>Relevance</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("rating")}>Top Rated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("newest")}>Newest</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("price_low")}>Price: Low to High</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("price_high")}>Price: High to Low</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("duration")}>Duration</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <AnimatePresence>
                    {activeTags.length > 0 && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 flex flex-wrap items-center gap-2"
                        >
                            {activeTags.map((t: string) => (
                                <Badge key={t} variant="secondary" className="rounded-full">
                                    {t}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="ml-1 h-5 w-5"
                                        onClick={() => removeTag(t)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function CoursePreview({ open, onOpenChange, course }: { open: boolean; onOpenChange: (o: boolean) => void; course: Course | null }) {
    if (!course) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{course.title}</DialogTitle>
                    <DialogDescription>
                        {course.category} • {course.level} • {course.language}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className={`aspect-video rounded-2xl bg-muted ${shimmer}`} />
                    <div className="flex flex-wrap gap-2">
                        {course.tags.map((t: string) => (
                            <Badge key={t} variant="outline" className="rounded-full">
                                {t}
                            </Badge>
                        ))}
                    </div>
                    <div className="text-sm leading-relaxed">
                        Kickstart your learning journey with hands‑on projects, quizzes, and downloadable resources. Replace this with the course overview fetched from API.
                    </div>
                </div>
                <DialogFooter className="flex items-center justify-between">
                    <div className="font-medium">{formatPrice(course.price)}</div>
                    <div className="flex gap-2">
                        <Button variant="outline">Add to Wishlist</Button>
                        <Button>
                            <GraduationCap className="mr-2 h-4 w-4" /> Enroll Now
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function CoursesPage() {
    // ---- State -----------------------------------------------------------
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All");
    const [language, setLanguage] = useState("All");
    const [price, setPrice] = useState("All");
    const [sort, setSort] = useState("relevance");
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const [page, setPage] = useState(1);
    const pageSize = 8;

    const [preview, setPreview] = useState<Course | null>(null);
    const [openPreview, setOpenPreview] = useState(false);

    // Debounce search
    const [debouncedQ, setDebouncedQ] = useState("");
    useEffect(() => {
        const id = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 300);
        return () => clearTimeout(id);
    }, [q]);

    // ---- Filtering & Sorting --------------------------------------------
    const filtered = useMemo(() => {
        let list = [...MOCK_COURSES];

        if (category !== "All") list = list.filter((c) => c.category === category);
        if (level !== "All") list = list.filter((c) => c.level === level);
        if (language !== "All") list = list.filter((c) => c.language === language);
        if (price !== "All") list = list.filter((c) => (price === "Free" ? c.price === 0 : c.price > 0));

        if (activeTags.length) {
            list = list.filter((c) => activeTags.every((t) => c.tags.includes(t)));
        }

        if (debouncedQ) {
            list = list.filter((c) =>
                [c.title, c.category, c.level, c.language, ...(c.tags || [])]
                    .join(" ")
                    .toLowerCase()
                    .includes(debouncedQ)
            );
        }

        switch (sort) {
            case "rating":
                list.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                list.sort((a, b) => b.lessons - a.lessons); // proxy for recency; replace with createdAt
                break;
            case "price_low":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price_high":
                list.sort((a, b) => b.price - a.price);
                break;
            case "duration":
                list.sort((a, b) => b.durationHours - a.durationHours);
                break;
            default:
                // relevance heuristic
                list.sort((a, b) => (b.rating + b.learners / 10000) - (a.rating + a.learners / 10000));
        }

        return list;
    }, [category, level, language, price, debouncedQ, sort, activeTags]);

    // ---- Pagination ------------------------------------------------------
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    useEffect(() => setPage(1), [category, level, language, price, debouncedQ, sort, activeTags]);
    const paged = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page]);

    // ---- Tag Helpers -----------------------------------------------------
    const addTag = (t: string) => setActiveTags((s) => (s.includes(t) ? s : [...s, t]));
    const removeTag = (t: string) => setActiveTags((s) => s.filter((x) => x !== t));

    // ---- Handlers --------------------------------------------------------
    const openCourse = (c: Course) => {
        setPreview(c);
        setOpenPreview(true);
    };

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 py-14">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Explore Courses</h1>
                            <p className="mt-2 text-sm md:text-base max-w-2xl">
                                Learn in-demand skills with hands‑on projects. Filter by category, level, language, and price. Enroll and start today.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Python", "React", "Next.js", "Flutter", "Docker"].map((t) => (
                                    <Button key={t} variant="secondary" size="sm" className="rounded-full" onClick={() => addTag(t)}>
                                        #{t}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 opacity-80">
                            {[Layers, Globe, GraduationCap].map((Icon, i) => (
                                <div key={i} className={`h-20 w-24 rounded-2xl bg-muted ${shimmer} relative overflow-hidden`}>
                                    <Icon className="absolute right-3 bottom-3 h-6 w-6" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <FilterBar
                q={q}
                setQ={setQ}
                category={category}
                setCategory={setCategory}
                level={level}
                setLevel={setLevel}
                language={language}
                setLanguage={setLanguage}
                price={price}
                setPrice={setPrice}
                sort={sort}
                setSort={setSort}
                activeTags={activeTags}
                removeTag={removeTag}
            />

            {/* Content */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                {/* Stats + Tabs */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm">
                        Showing <span className="font-medium">{filtered.length}</span> courses
                        {debouncedQ && (
                            <span>
                                {" "}for <span className="font-medium">“{q}”</span>
                            </span>
                        )}
                    </div>
                    <Tabs defaultValue="all" className="w-full md:w-auto">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="popular">Popular</TabsTrigger>
                            <TabsTrigger value="new">New</TabsTrigger>
                            <TabsTrigger value="free">Free</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Grid */}
                {paged.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <AnimatePresence>
                            {paged.map((c) => (
                                <CourseCard key={c.id} course={c} onPreview={openCourse} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="rounded-2xl border p-10 text-center">
                        <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-muted" />
                        <h3 className="text-lg font-medium">No matching courses</h3>
                        <p className="mt-1 text-sm">Try adjusting filters or removing some tags.</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {activeTags.map((t) => (
                                <Button key={t} variant="secondary" size="sm" className="rounded-full" onClick={() => removeTag(t)}>
                                    Remove #{t}
                                </Button>
                            ))}
                            {(activeTags.length > 0 || q || category !== "All" || level !== "All" || language !== "All" || price !== "All") && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setQ("");
                                        setCategory("All");
                                        setLevel("All");
                                        setLanguage("All");
                                        setPrice("All");
                                        setActiveTags([]);
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-between gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <div className="text-sm">
                            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </section>

            {/* Preview Dialog */}
            <CoursePreview open={openPreview} onOpenChange={setOpenPreview} course={preview} />

            {/* Footer CTA */}
            <section className="border-t">
                <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col items-center text-center gap-3">
                    <h3 className="text-xl font-semibold">Can’t find what you’re looking for?</h3>
                    <p className="text-sm">Tell us which course you want next. We’ll build it fast.</p>
                    <Button className="mt-2">Request a Course</Button>
                </div>
            </section>
        </div>
    );
}

// ---- Integration Notes -------------------------------------------------
// 1) Replace MOCK_COURSES with your API data.
// 2) Wire up the “Enroll Now” button to your checkout/enrollment flow.
// 3) For images, use course.bannerUrl and Next/Image if domains are allowed. Keep semantic colors via shadcn tokens.
// 4) Move filters to server search params if you prefer URL‑syncing.