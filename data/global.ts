import { BlogPost, Product } from "@/utils/interfaces";
// @/config/dashboardConfig.ts
import {
  FaChartPie,
  FaBox,
  FaPen,
  FaUsers,
  FaCog,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";

export const navlinks = [
  { label: "Home", link: "/" },
  { label: "Products", link: "/products" },
  { label: "Services", link: "/services" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
  { label: "Blogs", link: "/blogs" },
];

export const sampleProduct: Product = {
  id: "blockchain-ai-integration",
  title: "Mastering Blockchain and AI Integration",
  subtitle: "Build Intelligent Decentralized Applications",
  description:
    "Learn to combine blockchain and AI to create secure, smart dApps with real-world applications.",
  longDescription:
    "This comprehensive course dives deep into the integration of blockchain technology and artificial intelligence. You'll explore how to leverage smart contracts with machine learning models to build decentralized applications (dApps) that are secure, scalable, and intelligent. Through hands-on projects, you'll master tools like Solidity, TensorFlow, and Chainlink, and learn to deploy AI-driven smart contracts on Ethereum. The course covers practical use cases such as decentralized finance (DeFi), predictive analytics on-chain, and secure data sharing. Perfect for developers looking to stay ahead in the Web3 and AI revolution.",
  type: "Course",
  price: "199.99",
  originalPrice: "249.99",
  currency: "USD",
  category: "Blockchain",
  difficulty: "Intermediate",
  level: "Intermediate",
  duration: "8 weeks",
  language: "English",
  instructor: {
    name: "Dr. Emily Carter",
    bio: "PhD in Computer Science with 10+ years in blockchain and AI research. Lead developer at Web3 Innovate.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    credentials: [
      "PhD in Computer Science",
      "Certified Blockchain Developer",
      "AI Research Fellow at MIT",
    ],
  },
  imageUrl:
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
  videoPreviewUrl: "https://www.pexels.com/video/8557642/download/",
  featured: true,
  status: "published",
  tags: ["Blockchain, AI, Web3, Smart Contracts, Machine Learning"],
  technologies: ["Solidity, TensorFlow, Chainlink, Ethereum, Python"],
  includes: [
    "Access to course materials",
    "Downloadable code samples",
    "Certificate of completion",
    "1-year access to updates",
    "Community Discord access",
  ],
  rating: 4.8,
  totalReviews: 120,
  studentsEnrolled: 1500,
  features: [
    {
      icon: "📚",
      title: "Hands-On Projects",
      description: "Build real-world dApps integrating AI and blockchain.",
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Get guidance from industry-leading instructors.",
    },
    {
      icon: "💻",
      title: "Interactive Labs",
      description: "Practice with live coding environments.",
    },
  ],
  modules: [],
  testimonials: [
    {
      name: "Michael Lee",
      role: "Software Engineer",
      rating: 5,
      comment:
        "This course transformed my career! I built my first AI-powered dApp.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
    {
      name: "Sarah Johnson",
      role: "Data Scientist",
      rating: 4,
      comment:
        "Great content, though I wish there were more advanced AI topics.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    },
  ],
  faqs: [
    {
      question: "Do I need prior blockchain experience?",
      answer:
        "Basic programming knowledge is recommended, but we cover blockchain fundamentals in the first module.",
    },
    {
      question: "What tools will I learn?",
      answer:
        "You'll master Solidity, TensorFlow, Chainlink, and Ethereum development tools.",
    },
    {
      question: "Is there a certificate provided?",
      answer:
        "Yes, you'll receive a certificate of completion upon finishing the course.",
    },
  ],
};

export const dashboardPages = [
  {
    path: "/dashboard",
    label: "Overview",
    title: "Dashboard Overview",
    icon: FaChartPie,
    badge: null,
    roles: ["admin"],
  },
  {
    path: "/dashboard/products",
    label: "Products",
    title: "Products Management",
    icon: FaBox,
    badge: "12",
    roles: ["instructor", "admin"],
  },
  {
    path: "/dashboard/services",
    label: "Services",
    title: "Services Management",
    icon: FaBriefcase,
    badge: "4",
    roles: ["admin"],
  },
  {
    path: "/dashboard/purchases",
    label: "Purchases",
    title: "Purchased Items",
    icon: FaDollarSign,
    badge: null,
    roles: ["student", "instructor", "admin"],
  },
  {
    path: "/dashboard/blogs",
    label: "Blogs",
    title: "Blog Posts",
    icon: FaPen,
    badge: null,
    roles: ["admin"],
  },
  {
    path: "/dashboard/users",
    label: "Users",
    title: "User Management",
    icon: FaUsers,
    badge: "24",
    roles: ["admin"],
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    title: "System Settings",
    icon: FaCog,
    badge: null,
    roles: ["student", "instructor", "admin"],
  },
];

export const ADDITIONAL_DISPOSABLE_DOMAINS = [
  "p-y.cc",
  "x-z.cc",
  "temp-mail.org",
  "guerrillamail.com",
  "mailinator.com",
  "yopmail.com",
  "10minutemail.com",
  "maildrop.cc",
  "tempail.com",
  "getnada.com",
  "mohmal.com",
  "emailondeck.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "bccto.me",
  "chacuo.net",
  "discardmail.com",
  "emailias.com",
  "emz.net",
  "fakemail.net",
  "haltospam.com",
  "incognitomail.org",
  "kasmail.com",
  "mailcatch.com",
  "mailnull.com",
  "mvrht.com",
  "noclickemail.com",
  "nowmymail.com",
  "put2.net",
  "rcpt.at",
  "snapmail.cc",
  "sofort-mail.de",
  "tafmail.com",
  "teleworm.us",
  "tfwno.gf",
  "thankyou2010.com",
  "trashmail.at",
  "trashmail.com",
  "trashmail.io",
  "trashmail.me",
  "trashmail.net",
  "trashymail.com",
  "trbvm.com",
  "turual.com",
  "twinpine.com",
  "upliftnow.com",
  "venompen.com",
  "veryrealemail.com",
  "vidchart.com",
  "viditag.com",
  "viewcastmedia.com",
  "viewcastmedia.net",
  "viewcastmedia.org",
  "webemail.me",
  "webm4il.info",
  "whatpayne.com",
  "whyspam.me",
  "willselfdestruct.com",
  "xoxy.net",
  "yogamaven.com",
  "yuurok.com",
  "zehnminutenmail.de",
  "zoemail.org",
];

export const sampleBlogPost: BlogPost = {
  id: "1",
  title: "How to Build a Solana Crowdfunding dApp: A Step-by-Step Guide",
  excerpt:
    "Learn how to create a decentralized crowdfunding platform on Solana using Rust and Anchor. This comprehensive tutorial walks you through setting up smart contracts, integrating a React front-end, and deploying your dApp.",
  category: "Solana",
  readTime: "15 min read",
  publishDate: new Date("July 15, 2025"),
  author: {
    name: "Alex Thompson",
    avatar: "👨‍💻",
    bio: "Senior Blockchain Developer & Web3 Educator",
  },
  updatedAt: new Date("July 15, 2025"),
  featured: true,
  status: "published",
  views: 12345,
  comments: 78,
  topics: ["Solana", "Rust", "Anchor", "React", "Smart Contracts"],
  image: "🚀",
  slug: "how-to-build-a-solana-crowdfunding-dapp",
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
