"use client";

import MarkdownRenderer from "@/components/blogs/details/MardownRenderer";
import ProgressBar from "@/components/blogs/details/ProgressBar";
import RelatedArticles from "@/components/blogs/details/RelatedArticles";
import SocialShare from "@/components/blogs/details/SocialShare";
import TableOfContents from "@/components/blogs/details/TableOfContent";
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

[Watch the complete tutorial](https://youtu.be/U7vR_9B2EqA)

![Solana dApp Architecture](https://pbs.twimg.com/media/GyBjTKoXkAAwBeq?format=jpg&name=large)

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
              <article className="prose prose-sm sm:prose-lg max-w-none">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="blog-content space-y-4 sm:space-y-6">
                    <MarkdownRenderer content={blogPost.content} />
                  </div>
                </div>
              </article>

              {/* Article Footer - Responsive */}
              <div className="mt-8 sm:mt-12 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#D2145A]/20">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Found this tutorial helpful?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-2">
                    Join our community to get more Web3 development insights and
                    connect with fellow developers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                    <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                      Join Discord Community
                    </button>
                    <button className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto">
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
