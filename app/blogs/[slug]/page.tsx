"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Type definitions
interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: Author;
  topics: string[];
  image: string;
  gradient: string;
  content: string;
}

interface RelatedPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  gradient: string;
  image: string;
}

interface ShareLink {
  name: string;
  icon: string;
  url?: string;
  color: string;
  onClick?: () => void;
}

interface TocItem {
  level: number;
  text: string;
  id: string;
}

// Mock blog data - in real app, this would come from your CMS/API
const blogPost: BlogPost = {
  id: 1,
  title: "How to Build a Solana Crowdfunding dApp: A Step-by-Step Guide",
  excerpt:
    "Learn how to create a decentralized crowdfunding platform on Solana using Rust and Anchor. This comprehensive tutorial walks you through setting up smart contracts, integrating a React front-end, and deploying your dApp.",
  category: "Solana",
  readTime: "15 min read",
  publishDate: "July 15, 2025",
  author: {
    name: "Alex Thompson",
    avatar: "👨‍💻",
    bio: "Senior Blockchain Developer & Web3 Educator",
  },
  topics: ["Solana", "Rust", "Anchor", "React", "Smart Contracts"],
  image: "🚀",
  gradient: "from-purple-500 to-indigo-500",
  content: `
# Introduction

Building a crowdfunding dApp on Solana combines the power of blockchain technology with the accessibility of decentralized finance. In this comprehensive tutorial, we'll walk through creating a complete crowdfunding platform using Rust, Anchor, and React.

## What You'll Learn

- Setting up a Solana development environment
- Writing smart contracts with Rust and Anchor
- Integrating Web3 functionality with React
- Deploying your dApp to Solana devnet/mainnet

## Prerequisites

Before we start, make sure you have:

\`\`\`bash
# Required tools
node --version  # v16+
rust --version  # 1.60+
solana --version # 1.14+
anchor --version # 0.28+
\`\`\`

## Step 1: Setting Up the Project Structure

Let's start by creating our project structure:

\`\`\`
crowdfunding-dapp/
├── programs/
│   └── crowdfunding/
│       └── src/
│           └── lib.rs
├── app/
│   ├── components/
│   ├── pages/
│   └── utils/
└── tests/
\`\`\`

## Step 2: Writing the Smart Contract

Here's our main program structure in Rust:

\`\`\`rust
use anchor_lang::prelude::*;

declare_id!("YOUR_PROGRAM_ID_HERE");

#[program]
pub mod crowdfunding {
    use super::*;

    pub fn initialize_campaign(
        ctx: Context<InitializeCampaign>,
        name: String,
        description: String,
        target: u64,
        deadline: i64,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.target = target;
        campaign.deadline = deadline;
        campaign.creator = ctx.accounts.creator.key();
        campaign.raised = 0;
        campaign.is_active = true;
        
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        
        // Transfer SOL from donor to campaign
        let ix = anchor_lang::system_program::Transfer {
            from: ctx.accounts.donor.to_account_info(),
            to: ctx.accounts.campaign.to_account_info(),
        };
        
        anchor_lang::system_program::transfer(
            CpiContext::new(ctx.accounts.system_program.to_account_info(), ix),
            amount,
        )?;
        
        campaign.raised += amount;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeCampaign<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Campaign::INIT_SPACE
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub donor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Campaign {
    #[max_len(50)]
    pub name: String,
    #[max_len(200)]
    pub description: String,
    pub target: u64,
    pub raised: u64,
    pub deadline: i64,
    pub creator: Pubkey,
    pub is_active: bool,
}
\`\`\`

## Step 3: Building the Frontend

Now let's create our React frontend:

\`\`\`jsx
import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';

const CrowdfundingApp = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Initialize Solana connection
    const connection = new Connection('https://api.devnet.solana.com');
    
    // Connect to wallet
    if (window.solana) {
      setWallet(window.solana);
    }
  }, []);

  const createCampaign = async (campaignData) => {
    try {
      // Implementation for creating campaign
      console.log('Creating campaign:', campaignData);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="crowdfunding-app">
      {/* Your frontend components here */}
    </div>
  );
};

export default CrowdfundingApp;
\`\`\`

## Step 4: Testing Your Smart Contract

Create comprehensive tests for your program:

\`\`\`javascript
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Crowdfunding } from "../target/types/crowdfunding";

describe("crowdfunding", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Crowdfunding as Program<Crowdfunding>;

  it("Initializes a campaign", async () => {
    const campaign = anchor.web3.Keypair.generate();
    
    await program.methods
      .initializeCampaign(
        "Save the Whales",
        "Help us protect marine life",
        anchor.web3.LAMPORTS_PER_SOL * 10,
        Math.floor(Date.now() / 1000) + 86400
      )
      .accounts({
        campaign: campaign.publicKey,
        creator: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([campaign])
      .rpc();

    const campaignAccount = await program.account.campaign.fetch(campaign.publicKey);
    console.log("Campaign created:", campaignAccount);
  });
});
\`\`\`

## Step 5: Deployment

Deploy your program to Solana:

\`\`\`bash
# Build the program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Get your program ID
solana address -k target/deploy/crowdfunding-keypair.json
\`\`\`

## Best Practices & Security

1. **Input Validation**: Always validate user inputs
2. **Access Control**: Implement proper authorization checks
3. **Error Handling**: Use Result types and handle errors gracefully
4. **Testing**: Write comprehensive unit and integration tests

## Conclusion

You've now built a complete crowdfunding dApp on Solana! This tutorial covered the essential components needed to create a decentralized application that leverages blockchain technology for transparent and secure fundraising.

### Next Steps

- Implement campaign withdrawal functionality
- Add campaign categories and filtering
- Create a more sophisticated UI/UX
- Deploy to mainnet for production use

### Resources

- [Solana Documentation](https://docs.solana.com)
- [Anchor Framework](https://anchor-lang.com)
- [Solana Cookbook](https://solanacookbook.com)

**Happy coding! 🚀**
  `,
};

// Table of Contents Component
interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Extract headings from markdown content
  const headings = content.match(/^#{1,3} .+$/gm) || [];
  const tocItems: TocItem[] = headings.map((heading) => {
    const levelMatch = heading.match(/^#+/);
    const level = levelMatch ? levelMatch[0].length : 1;
    const text = heading.replace(/^#+\s/, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return { level, text, id };
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(tocItems[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        📋 Table of Contents
      </h3>
      <nav className="space-y-2">
        {tocItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`block text-sm transition-colors duration-200 hover:text-[#D2145A] ${
              item.level === 1
                ? "font-semibold"
                : item.level === 2
                  ? "pl-4"
                  : "pl-8"
            } ${
              activeSection === item.id
                ? "text-[#D2145A] font-semibold"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

// Social Share Component
interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("Link copied to clipboard!");
        });
    }
  };

  const shareLinks: ShareLink[] = [
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-500",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-600",
    },
    {
      name: "Copy Link",
      icon: "🔗",
      color: "hover:bg-gray-500",
      onClick: handleCopyLink,
    },
  ];

  const handleLinkClick = (link: ShareLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex gap-3">
      {shareLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => handleLinkClick(link)}
          className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 ${link.color} hover:text-white`}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </button>
      ))}
    </div>
  );
};

// Code Block Component
interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
      {language && (
        <div className="absolute top-2 left-4 text-xs text-gray-400 uppercase">
          {language}
        </div>
      )}
    </div>
  );
};

// Related Articles Component
const RelatedArticles: React.FC = () => {
  const relatedPosts: RelatedPost[] = [
    {
      title: "Mastering Solidity: Writing Secure Smart Contracts",
      excerpt: "Learn advanced Solidity patterns and security best practices.",
      category: "Smart Contracts",
      readTime: "12 min",
      gradient: "from-yellow-500 to-orange-500",
      image: "⚡",
    },
    {
      title: "DeFi Development: Building Yield Farming Protocols",
      excerpt: "Step-by-step guide to creating DeFi yield farming mechanisms.",
      category: "DeFi",
      readTime: "18 min",
      gradient: "from-green-500 to-emerald-500",
      image: "🌱",
    },
    {
      title: "Web3 Security: Protecting Your dApps",
      excerpt: "Essential security practices for decentralized applications.",
      category: "Security",
      readTime: "14 min",
      gradient: "from-red-500 to-pink-500",
      image: "🛡️",
    },
  ];

  const handleArticleClick = (title: string) => {
    // In a real app, this would navigate to the article
    console.log(`Navigate to article: ${title}`);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Related Articles
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/50 dark:border-gray-700/50"
              onClick={() => handleArticleClick(post.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleArticleClick(post.title);
                }
              }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${post.gradient} rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {post.image}
              </div>
              <span
                className={`bg-gradient-to-r ${post.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block`}
              >
                {post.category}
              </span>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#D2145A] transition-colors duration-300">
                {post.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ⏱️ {post.readTime}
                </span>
                <span className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-sm transition-colors duration-300">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Progress Bar Component
const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(Math.max(scrollPercent, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Markdown Renderer Component
interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderMarkdown = (content: string): React.ReactNode[] => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End of code block
          elements.push(
            <CodeBlock
              key={`code-${index}`}
              code={codeContent.trim()}
              language={codeLanguage}
            />,
          );
          inCodeBlock = false;
          codeContent = "";
          codeLanguage = "";
        } else {
          // Start of code block
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      // Headers
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h3
            key={index}
            id={id}
            className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
          >
            {text}
          </h3>,
        );
      } else if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2
            key={index}
            id={id}
            className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6"
          >
            {text}
          </h2>,
        );
      } else if (line.startsWith("# ")) {
        const text = line.replace("# ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h1
            key={index}
            id={id}
            className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-8"
          >
            {text}
          </h1>,
        );
      } else if (line.includes("`") && !line.startsWith("```")) {
        // Inline code
        const parts = line.split("`");
        const renderedParts = parts.map((part, i) =>
          i % 2 === 1 ? (
            <code
              key={i}
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono"
            >
              {part}
            </code>
          ) : (
            part
          ),
        );
        elements.push(
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
          >
            {renderedParts}
          </p>,
        );
      } else if (line.trim()) {
        // Regular paragraphs
        elements.push(
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
          >
            {line}
          </p>,
        );
      } else {
        // Empty lines
        elements.push(<br key={index} />);
      }
    });

    return elements;
  };

  return <>{renderMarkdown(content)}</>;
};

// Main Blog Detail Page Component
const Page: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showMobileToc, setShowMobileToc] = useState<boolean>(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd save this to localStorage or send to your API
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `bookmark-${blogPost.id}`,
        (!isBookmarked).toString(),
      );
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    // In a real Next.js app, you'd use router.push(href)
    console.log(`Navigate to: ${href}`);
  };

  useEffect(() => {
    // Load bookmark state
    if (typeof window !== "undefined") {
      const bookmarkState = localStorage.getItem(`bookmark-${blogPost.id}`);
      if (bookmarkState) {
        setIsBookmarked(bookmarkState === "true");
      }
    }
  }, []);

  return (
    <MarketingLayout>
      <ProgressBar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="hover:text-[#D2145A] transition-colors duration-200"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              onClick={(e) => handleNavClick(e, "/blog")}
              className="hover:text-[#D2145A] transition-colors duration-200"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">
              {blogPost.category}
            </span>
          </nav>

          {/* Article Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {blogPost.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {blogPost.publishDate}
              </span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400">
                {blogPost.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cambo font-normal text-gray-900 dark:text-white mb-8 leading-tight">
              {blogPost.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {blogPost.excerpt}
            </p>

            {/* Author & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-xl">
                  {blogPost.author.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {blogPost.author.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {blogPost.author.bio}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <SocialShare title={blogPost.title} url={currentUrl} />
                <button
                  onClick={handleBookmark}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isBookmarked
                      ? "bg-[#D2145A] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#D2145A] hover:text-white"
                  }`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  {isBookmarked ? "♥" : "♡"}
                </button>
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {blogPost.topics.map((topic, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-[#D2145A] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Desktop */}
            <div className="lg:col-span-1 hidden lg:block">
              <TableOfContents content={blogPost.content} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="blog-content space-y-6">
                    <MarkdownRenderer content={blogPost.content} />
                  </div>
                </div>
              </article>

              {/* Article Footer */}
              <div className="mt-12 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-3xl p-8 border border-[#D2145A]/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Found this tutorial helpful?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Join our community to get more Web3 development insights and
                    connect with fellow developers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                      onClick={() => console.log("Join Discord Community")}
                    >
                      Join Discord Community
                    </button>
                    <button
                      className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300"
                      onClick={() => console.log("Subscribe to Newsletter")}
                    >
                      Subscribe to Newsletter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticles />

      {/* Mobile TOC Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          className="bg-[#D2145A] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
          onClick={() => setShowMobileToc(!showMobileToc)}
          aria-label="Toggle table of contents"
        >
          📋
        </button>
      </div>

      {/* Mobile TOC Overlay */}
      {showMobileToc && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowMobileToc(false)}
        >
          <div
            className="absolute right-4 top-20 bottom-20 w-80 max-w-[calc(100vw-2rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Table of Contents
                </h3>
                <button
                  onClick={() => setShowMobileToc(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                  aria-label="Close table of contents"
                >
                  ×
                </button>
              </div>
              <TableOfContents content={blogPost.content} />
            </div>
          </div>
        </div>
      )}
    </MarketingLayout>
  );
};

export default Page;
