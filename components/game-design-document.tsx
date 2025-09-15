"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Gamepad2,
  Zap,
  Target,
  Users,
  Smartphone,
  Palette,
  Code,
  DollarSign,
  Star,
  Trophy,
  Puzzle,
  Sparkles,
} from "lucide-react"

export function GameDesignDocument() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Game Overview", icon: Gamepad2 },
    { id: "mechanics", title: "Core Mechanics", icon: Zap },
    { id: "ui-design", title: "UI/UX Design", icon: Palette },
    { id: "features", title: "Features", icon: Star },
    { id: "technical", title: "Technical Specs", icon: Code },
    { id: "monetization", title: "Monetization", icon: DollarSign },
    { id: "audience", title: "Target Audience", icon: Users },
    { id: "deliverables", title: "Deliverables", icon: Target },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 animate-float">
            <Sparkles className="h-8 w-8 text-primary animate-glow" />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Game Design Document
            </Badge>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            CodeVerse Adventures
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A futuristic adventure-puzzle hybrid where players solve mysteries to restore balance to a broken digital
            universe through innovative gameplay mechanics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-primary border-primary">
              Adventure
            </Badge>
            <Badge variant="outline" className="text-secondary border-secondary">
              Puzzle
            </Badge>
            <Badge variant="outline" className="text-accent border-accent">
              Futuristic
            </Badge>
            <Badge variant="outline" className="text-primary border-primary">
              Mobile
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  {section.title}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {activeSection === "overview" && <GameOverview />}
        {activeSection === "mechanics" && <CoreMechanics />}
        {activeSection === "ui-design" && <UIDesign />}
        {activeSection === "features" && <Features />}
        {activeSection === "technical" && <TechnicalSpecs />}
        {activeSection === "monetization" && <Monetization />}
        {activeSection === "audience" && <TargetAudience />}
        {activeSection === "deliverables" && <Deliverables />}
      </div>
    </div>
  )
}

function GameOverview() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Game Overview</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Dive into a digital realm where coding meets adventure in an immersive puzzle experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="h-5 w-5 text-primary" />
              Genre & Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">Genre</h4>
              <p>Adventure + Puzzle hybrid with strategic elements</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary mb-2">Theme</h4>
              <p>Futuristic digital universe with cyberpunk aesthetics</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-secondary" />
              Core Concept
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              Players embark on a journey as a young coder trapped in a virtual realm, solving "broken code fragments"
              through innovative puzzle mechanics while uncovering the mysteries of the digital universe.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Storyline & Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Story Arc</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Young coder trapped in virtual realm</li>
                <li>• Each level = broken code fragment to repair</li>
                <li>• Progressive world unlocking system</li>
                <li>• Mystery unfolds through environmental storytelling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">World Progression</h4>
              <div className="space-y-3">
                {[
                  { world: "Cyber City", progress: 100, color: "bg-primary" },
                  { world: "Floating Islands", progress: 80, color: "bg-secondary" },
                  { world: "Crystal Caves", progress: 60, color: "bg-accent" },
                  { world: "Space Hub", progress: 40, color: "bg-chart-4" },
                  { world: "Core Matrix", progress: 20, color: "bg-chart-5" },
                ].map((world, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{world.world}</span>
                      <span>{world.progress}%</span>
                    </div>
                    <Progress value={world.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CoreMechanics() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Core Gameplay Mechanics</h2>
        <p className="text-xl text-muted-foreground">
          Innovative control schemes and progression systems designed for mobile excellence.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Tap & swipe for movement</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Drag & drop puzzle blocks</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Time-based quick actions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="text-secondary">Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Solve puzzles to unlock doors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Collect coins & energy orbs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Escape enemies and traps</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">Scoring System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Coins = basic points</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Speed bonus = extra rewards</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Combo solving = multipliers</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progression Structure</CardTitle>
          <CardDescription>Carefully balanced difficulty curve across 5 unique worlds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Level Structure</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>5 Worlds</span>
                  <Badge variant="secondary">Complete</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>20 Levels per World</span>
                  <Badge variant="secondary">100 Total</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>Boss Stages</span>
                  <Badge variant="secondary">5 Epic Battles</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Difficulty Progression</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tutorial (Levels 1-5)</span>
                    <span>Easy</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Learning (Levels 6-20)</span>
                    <span>Medium</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery (Levels 21-80)</span>
                    <span>Hard</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Expert (Levels 81-100)</span>
                    <span>Extreme</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UIDesign() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">UI/UX Design</h2>
        <p className="text-xl text-muted-foreground">
          Futuristic interface design with intuitive navigation and stunning visual effects.
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Color Palette
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-20 bg-primary rounded-lg mb-2 animate-glow"></div>
              <p className="text-sm font-medium">Electric Blue</p>
              <p className="text-xs text-muted-foreground">#0E6BA8</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-secondary rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Neon Purple</p>
              <p className="text-xs text-muted-foreground">#9B59B6</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-accent rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Cyber Green</p>
              <p className="text-xs text-muted-foreground">#2ECC71</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-foreground rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Space Black</p>
              <p className="text-xs text-muted-foreground">#121212</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Screen Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                <span>Home Screen</span>
                <span className="text-sm text-muted-foreground">Play, Profile, Shop, Settings</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <span>Game Screen</span>
                <span className="text-sm text-muted-foreground">Puzzle grid, controls, score</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                <span>Leaderboard</span>
                <span className="text-sm text-muted-foreground">Global + Friends ranking</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Settings</span>
                <span className="text-sm text-muted-foreground">Sound, difficulty, notifications</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Animations & Effects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span>Smooth level transitions</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-secondary rounded-full animate-glow"></div>
                <span>Energy orbs glowing</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-accent rounded-full animate-bounce"></div>
                <span>Puzzle pieces shattering</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-chart-4 rounded-full animate-float"></div>
                <span>Floating UI elements</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UI Mockup Preview</CardTitle>
          <CardDescription>Interactive game interface with futuristic design elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8 rounded-lg border">
            <div className="max-w-sm mx-auto bg-foreground/90 rounded-2xl p-6 text-background">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm">
                  <div className="text-primary">Score: 12,450</div>
                  <div className="text-secondary">Level 15</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs">3</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded ${
                      i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-secondary" : "bg-accent"
                    } opacity-80`}
                  ></div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button size="sm" variant="outline" className="bg-primary/20 border-primary text-primary">
                  Pause
                </Button>
                <Button size="sm" variant="outline" className="bg-secondary/20 border-secondary text-secondary">
                  Hint
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Features() {
  const features = [
    {
      title: "Player Profile",
      description: "Customizable avatars with futuristic outfits and XP progression",
      icon: Users,
      color: "primary",
    },
    {
      title: "Daily Challenges",
      description: "Special puzzles with exclusive rewards and time-limited events",
      icon: Target,
      color: "secondary",
    },
    {
      title: "Power-ups & Rewards",
      description: "Unlock special abilities like slow time, shield, and double points",
      icon: Zap,
      color: "accent",
    },
    {
      title: "Multiplayer Battles",
      description: "Online timed puzzle battles with friends and global players",
      icon: Trophy,
      color: "chart-4",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Game Features</h2>
        <p className="text-xl text-muted-foreground">
          Engaging features designed to keep players coming back for more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card
              key={index}
              className={`border-${feature.color}/20 hover:border-${feature.color}/40 transition-colors`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 bg-${feature.color}/10 rounded-lg`}>
                    <Icon className={`h-5 w-5 text-${feature.color}`} />
                  </div>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>In-App Purchases</CardTitle>
          <CardDescription>
            Carefully balanced monetization that enhances gameplay without being intrusive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Cosmetics</h4>
              <p className="text-sm text-muted-foreground">Avatar skins, outfits, and visual customizations</p>
            </div>
            <div className="text-center p-6 bg-secondary/5 rounded-lg border border-secondary/20">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Boosters</h4>
              <p className="text-sm text-muted-foreground">Power-ups and gameplay enhancers</p>
            </div>
            <div className="text-center p-6 bg-accent/5 rounded-lg border border-accent/20">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Premium Content</h4>
              <p className="text-sm text-muted-foreground">Exclusive worlds and special challenges</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TechnicalSpecs() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
        <p className="text-xl text-muted-foreground">
          Cutting-edge technology stack for optimal performance and scalability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Platform & Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Platforms</h4>
              <div className="flex gap-2">
                <Badge variant="outline">Android</Badge>
                <Badge variant="outline">iOS</Badge>
                <Badge variant="outline">Cross-platform</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Engine Options</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Unity (3D effects, advanced graphics)</li>
                <li>• Unreal Engine (premium visuals)</li>
                <li>• Flutter (2D casual version)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-secondary" />
              Performance Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">60</div>
                <div className="text-sm text-muted-foreground">FPS Target</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{"<100"}</div>
                <div className="text-sm text-muted-foreground">MB Size</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{"<50"}</div>
                <div className="text-sm text-muted-foreground">ms Lag</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">4h+</div>
                <div className="text-sm text-muted-foreground">Battery Life</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technical Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Game Engine</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Unity 2023.x LTS</li>
                    <li>• C# scripting</li>
                    <li>• Universal Render Pipeline</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Graphics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 2D/3D hybrid rendering</li>
                    <li>• Particle systems</li>
                    <li>• Shader effects</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="backend" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Server</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Node.js / Express</li>
                    <li>• WebSocket connections</li>
                    <li>• RESTful APIs</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Services</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Authentication system</li>
                    <li>• Leaderboards</li>
                    <li>• Push notifications</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="database" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Primary Database</h4>
                  <ul className="text-sm space-y-1">
                    <li>• PostgreSQL</li>
                    <li>• User profiles & progress</li>
                    <li>• Game statistics</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Caching</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Redis for sessions</li>
                    <li>• Leaderboard caching</li>
                    <li>• Real-time data</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="deployment" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Cloud Platform</h4>
                  <ul className="text-sm space-y-1">
                    <li>• AWS / Google Cloud</li>
                    <li>• Auto-scaling</li>
                    <li>• Global CDN</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">CI/CD</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Automated testing</li>
                    <li>• Staged deployments</li>
                    <li>• Performance monitoring</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function Monetization() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Monetization Strategy</h2>
        <p className="text-xl text-muted-foreground">
          Balanced approach to revenue generation that enhances player experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Freemium Model</CardTitle>
            <CardDescription>Core game free with optional enhancements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Free to play</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Non-intrusive ads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Ads between levels only</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$0</div>
                <div className="text-sm text-muted-foreground">Entry Cost</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="text-secondary">In-App Purchases</CardTitle>
            <CardDescription>Optional content and convenience items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-sm">Cosmetic skins</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-sm">Power-ups & boosters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-sm">Premium puzzles</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">$0.99-$9.99</div>
                <div className="text-sm text-muted-foreground">Price Range</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">Premium Version</CardTitle>
            <CardDescription>One-time purchase for enhanced experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Remove all ads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Unlock extra worlds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Exclusive content</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">$4.99</div>
                <div className="text-sm text-muted-foreground">One-time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Projections</CardTitle>
          <CardDescription>Conservative estimates based on similar games in the market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">10K</div>
              <div className="text-sm text-muted-foreground">Monthly Active Users (Month 1)</div>
            </div>
            <div className="text-center p-6 bg-secondary/5 rounded-lg">
              <div className="text-3xl font-bold text-secondary mb-2">5%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
            <div className="text-center p-6 bg-accent/5 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">$2.50</div>
              <div className="text-sm text-muted-foreground">ARPU (Average Revenue Per User)</div>
            </div>
            <div className="text-center p-6 bg-chart-4/5 rounded-lg">
              <div className="text-3xl font-bold text-chart-4 mb-2">$1.2K</div>
              <div className="text-sm text-muted-foreground">Projected Monthly Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TargetAudience() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Target Audience</h2>
        <p className="text-xl text-muted-foreground">
          Understanding our players to create the perfect gaming experience.
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">12-35</div>
              <div className="text-sm text-muted-foreground">Age Range</div>
            </div>
            <div className="text-center p-6 bg-secondary/5 rounded-lg">
              <div className="text-4xl font-bold text-secondary mb-2">60%</div>
              <div className="text-sm text-muted-foreground">Mobile Gamers</div>
            </div>
            <div className="text-center p-6 bg-accent/5 rounded-lg">
              <div className="text-4xl font-bold text-accent mb-2">45%</div>
              <div className="text-sm text-muted-foreground">Female Players</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Player Personas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">The Casual Gamer</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Enjoys quick gaming sessions during commute or breaks. Values simple controls and engaging puzzles.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  15-25 years
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Students
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <h4 className="font-semibold text-secondary mb-2">The Adventure Seeker</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Loves story-driven games with progression systems. Seeks immersive experiences and character
                development.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  20-30 years
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Professionals
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">The Competitive Player</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Enjoys leaderboards, achievements, and multiplayer challenges. Values skill-based gameplay.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  25-35 years
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Gamers
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Easy-to-use touch controls</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>Adjustable difficulty settings</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Color-blind friendly mode</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                <span>Text size options</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-3 h-3 bg-chart-5 rounded-full"></div>
                <span>Audio cues and feedback</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
          <CardDescription>Competitive landscape and market positioning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Market Opportunity</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                  <span>Mobile Gaming Market</span>
                  <span className="font-semibold text-primary">$100B+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                  <span>Puzzle Game Segment</span>
                  <span className="font-semibold text-secondary">$15B</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                  <span>Annual Growth Rate</span>
                  <span className="font-semibold text-accent">12%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Competitive Advantage</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Unique adventure-puzzle hybrid gameplay</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Immersive futuristic storyline</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Innovative control mechanics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                  <span>Strong multiplayer component</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Deliverables() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Project Deliverables</h2>
        <p className="text-xl text-muted-foreground">
          Comprehensive documentation and assets for successful game development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Design Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Game Design Document (GDD)</span>
              <Badge variant="secondary">Complete</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Storyline Overview</span>
              <Badge variant="secondary">Complete</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Gameplay Flow Diagrams</span>
              <Badge variant="outline">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Technical Specifications</span>
              <Badge variant="secondary">Complete</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-secondary" />
              Visual Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>UI/UX Mockups</span>
              <Badge variant="outline">Planned</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Character Concept Art</span>
              <Badge variant="outline">Planned</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Environment Designs</span>
              <Badge variant="outline">Planned</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Icon & Logo Design</span>
              <Badge variant="outline">Planned</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Timeline</CardTitle>
          <CardDescription>Estimated timeline for complete game development and launch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-2">Phase 1</div>
                <div className="text-sm font-medium mb-1">Pre-production</div>
                <div className="text-xs text-muted-foreground">2-3 months</div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="text-2xl font-bold text-secondary mb-2">Phase 2</div>
                <div className="text-sm font-medium mb-1">Core Development</div>
                <div className="text-xs text-muted-foreground">6-8 months</div>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="text-2xl font-bold text-accent mb-2">Phase 3</div>
                <div className="text-sm font-medium mb-1">Testing & Polish</div>
                <div className="text-xs text-muted-foreground">2-3 months</div>
              </div>
              <div className="text-center p-4 bg-chart-4/5 rounded-lg border border-chart-4/20">
                <div className="text-2xl font-bold text-chart-4 mb-2">Phase 4</div>
                <div className="text-sm font-medium mb-1">Launch & Support</div>
                <div className="text-xs text-muted-foreground">Ongoing</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Detailed Milestones</h4>
              <div className="space-y-3">
                {[
                  {
                    phase: "Pre-production",
                    tasks: ["Finalize GDD", "Create art style guide", "Technical prototyping"],
                    progress: 80,
                  },
                  {
                    phase: "Core Development",
                    tasks: ["Implement core mechanics", "Build 5 worlds", "Multiplayer system"],
                    progress: 0,
                  },
                  {
                    phase: "Testing & Polish",
                    tasks: ["Beta testing", "Performance optimization", "Bug fixes"],
                    progress: 0,
                  },
                  {
                    phase: "Launch",
                    tasks: ["Store submission", "Marketing campaign", "Community building"],
                    progress: 0,
                  },
                ].map((milestone, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">{milestone.phase}</h5>
                      <span className="text-sm text-muted-foreground">{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="mb-2" />
                    <div className="text-sm text-muted-foreground">{milestone.tasks.join(" • ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Immediate Actions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Assemble development team</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Create detailed art style guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Build technical prototype</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Set up development pipeline</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Success Metrics</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>100K+ downloads in first month</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>4.5+ star rating on app stores</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>5%+ conversion to premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                  <span>Strong community engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
