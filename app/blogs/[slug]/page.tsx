import { Metadata } from "next";
import PageClient from "./PageClient";
import { BlogPost } from "./PageClient"; // Import BlogPost type

// Mock blog data - in a real app, this would come from a CMS/API
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

// Dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // In a real app, fetch the blog post data based on slug
  // const blogPost = await fetchBlogPostBySlug(slug);
  // For now, use the mock data
  return {
    title: `${blogPost.title} | Dapp Mentors Blog`,
    description: blogPost.excerpt,
    keywords: blogPost.topics.concat([
      "blockchain tutorial",
      "web3 guide",
      "dapp mentors",
    ]),
    authors: [{ name: blogPost.author.name }],
    creator: "Dapp Mentors",
    publisher: "Dapp Mentors",
    openGraph: {
      title: `${blogPost.title} | Dapp Mentors Blog`,
      description: blogPost.excerpt,
      url: `https://dappmentors.org/blog/${slug}`, // Replace with your actual domain
      siteName: "Dapp Mentors",
      images: [
        {
          url: "/images/og-blog-post.jpg", // Replace with your Open Graph image for blog posts
          width: 1200,
          height: 630,
          alt: blogPost.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: blogPost.publishDate,
      authors: [blogPost.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogPost.title} | Dapp Mentors Blog`,
      description: blogPost.excerpt,
      images: ["/images/twitter-blog-post.jpg"], // Replace with your Twitter card image for blog posts
      creator: "@dappmentors", // Replace with your Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Replace with your Google verification code
    },
    alternates: {
      canonical: `https://dappmentors.org/blog/${slug}`, // Replace with your actual domain
    },
  };
}

// Server component for dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`Fetching blog post for slug: ${slug}`);

  // In a real app, fetch the blog post data based on slug
  // const blogPost = await fetchBlogPostBySlug(slug);
  // For now, pass the mock data
  return <PageClient blogPost={blogPost} />;
}
