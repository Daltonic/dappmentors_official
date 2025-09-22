#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
import { BlogPost, BlogStatus } from "@/utils/interfaces";

dotenv.config();

// Configuration
const DATABASE_NAME: string = "dapp_mentors_official";
const COLLECTION_NAME: string = "blogs";
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
const NUM_BLOGS: number = parseInt(process.env.NUM_ITEM || "50", 10);

// Blog categories and topics
const CATEGORIES: string[] = [
  "Solana",
  "Ethereum",
  "DeFi",
  "NFT",
  "Smart Contracts",
  "Web3",
  "DAO",
  "Blockchain",
  "Tutorials",
  "Security",
];

const TOPICS_POOL: string[] = [
  "Solana",
  "Ethereum",
  "Bitcoin",
  "DeFi",
  "NFT",
  "DAO",
  "Smart Contracts",
  "Web3",
  "Rust",
  "Solidity",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Anchor",
  "Hardhat",
  "Foundry",
  "IPFS",
  "Metamask",
  "Phantom",
  "Wallet",
  "Trading",
  "Staking",
  "Yield Farming",
  "Cross-chain",
  "Layer 2",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Security",
  "Audit",
  "Testing",
  "Deployment",
];

// Sample authors
const AUTHORS = [
  {
    name: "Alex Thompson",
    avatar: "👨‍💻",
    bio: "Senior Blockchain Developer & Web3 Educator with 5+ years experience",
  },
  {
    name: "Sarah Chen",
    avatar: "👩‍💼",
    bio: "DeFi Protocol Architect and Smart Contract Security Expert",
  },
  {
    name: "Marcus Rodriguez",
    avatar: "🧑‍🔬",
    bio: "Solana Core Developer and Rust Programming Specialist",
  },
  {
    name: "Emma Johnson",
    avatar: "👩‍🎨",
    bio: "NFT Market Analyst and Digital Asset Strategist",
  },
  {
    name: "David Kim",
    avatar: "👨‍🔧",
    bio: "Full-Stack Web3 Developer and dApp Architecture Consultant",
  },
  {
    name: "Lisa Wang",
    avatar: "👩‍🏫",
    bio: "Blockchain Education Specialist and Technical Writer",
  },
];

// Blog post title templates
const TITLE_TEMPLATES: string[] = [
  "How to Build a {topic} {type}: A Step-by-Step Guide",
  "Complete Guide to {topic} Development in 2025",
  "Building Your First {topic} Application with {tech}",
  "Advanced {topic} Strategies for Developers",
  "The Ultimate {topic} Tutorial for Beginners",
  "Mastering {topic}: Best Practices and Tips",
  "{topic} Security: Essential Guidelines for Developers",
  "From Zero to Hero: Learning {topic} Development",
  "Top 10 {topic} Tools Every Developer Should Know",
  "Understanding {topic}: A Comprehensive Overview",
  "{topic} vs {alternative}: Which Should You Choose?",
  "Optimizing {topic} Performance: Advanced Techniques",
  "Common {topic} Mistakes and How to Avoid Them",
  "The Future of {topic}: Trends and Predictions",
  "Integrating {topic} with {integration}: Best Practices",
];

const APPLICATION_TYPES: string[] = [
  "dApp",
  "Smart Contract",
  "DeFi Protocol",
  "NFT Marketplace",
  "DAO Platform",
  "Wallet",
  "Trading Bot",
  "Staking Platform",
  "Cross-Chain Bridge",
  "DEX",
  "Lending Protocol",
  "Game",
];

const TECHNOLOGIES: string[] = [
  "Rust",
  "Solidity",
  "Anchor",
  "React",
  "Next.js",
  "Hardhat",
  "Foundry",
  "Web3.js",
  "Ethers.js",
  "TypeScript",
  "Node.js",
];

// Content templates for different types of blog posts
const TUTORIAL_CONTENT = (topic: string, tech: string) => `
# Introduction

Welcome to this comprehensive guide on ${topic} development! In this tutorial, we'll walk through building a complete ${topic.toLowerCase()} application using ${tech} and modern Web3 technologies.

## What You'll Learn

- Setting up your development environment
- Core ${topic} concepts and architecture
- Writing and deploying smart contracts
- Building a user-friendly frontend interface
- Testing and security best practices

## Prerequisites

Before we dive in, make sure you have:

\`\`\`bash
# Required tools
node --version  # v18+
${tech.toLowerCase()} --version
git --version
\`\`\`

## Step 1: Environment Setup

Let's start by setting up our development environment:

\`\`\`bash
# Create project directory
mkdir ${topic.toLowerCase()}-app
cd ${topic.toLowerCase()}-app

# Initialize project
npm init -y
npm install ${tech.toLowerCase()}
\`\`\`

## Step 2: Project Structure

Here's our recommended project structure:

\`\`\`
${topic.toLowerCase()}-app/
├── contracts/          # Smart contracts
├── frontend/          # React application
├── tests/             # Test files
├── scripts/           # Deployment scripts
└── docs/              # Documentation
\`\`\`

## Step 3: Smart Contract Development

Let's create our main smart contract:

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ${topic.replace(/\s/g, "")} {
    address public owner;
    mapping(address => uint256) public balances;
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Transfer(address(0), msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Transfer(msg.sender, address(0), amount);
    }
}
\`\`\`

## Step 4: Frontend Integration

Now let's build our React frontend:

\`\`\`jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ${topic.replace(/\s/g, "")}App = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Initialize contract here
        
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  return (
    <div className="app">
      <h1>${topic} dApp</h1>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ${topic.replace(/\s/g, "")}App;
\`\`\`

## Step 5: Testing

Write comprehensive tests for your smart contract:

\`\`\`javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("${topic}", function () {
  let ${topic.replace(/\s/g, "").toLowerCase()};
  let owner;
  let addr1;
  
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const ${topic.replace(/\s/g, "")} = await ethers.getContractFactory("${topic.replace(/\s/g, "")}");
    ${topic.replace(/\s/g, "").toLowerCase()} = await ${topic.replace(/\s/g, "")}.deploy();
  });

  it("Should allow deposits", async function () {
    const depositAmount = ethers.utils.parseEther("1.0");
    
    await ${topic.replace(/\s/g, "").toLowerCase()}.connect(addr1).deposit({ value: depositAmount });
    
    const balance = await ${topic.replace(/\s/g, "").toLowerCase()}.balances(addr1.address);
    expect(balance).to.equal(depositAmount);
  });
});
\`\`\`

## Step 6: Deployment

Deploy your contract to testnet:

\`\`\`bash
# Deploy to testnet
npx hardhat run scripts/deploy.js --network sepolia

# Verify contract
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
\`\`\`

## Best Practices

1. **Security First**: Always audit your smart contracts
2. **Gas Optimization**: Use efficient patterns to minimize gas costs
3. **Error Handling**: Implement proper error handling in both contracts and frontend
4. **Testing**: Write comprehensive unit and integration tests
5. **Documentation**: Keep your code well-documented

## Conclusion

Congratulations! You've successfully built a ${topic.toLowerCase()} application. This tutorial covered the essential components needed to create a production-ready dApp.

### Next Steps

- Implement additional features
- Deploy to mainnet
- Add more sophisticated UI/UX
- Implement advanced security measures

### Resources

- [Official ${tech} Documentation](https://docs.${tech.toLowerCase()}.com)
- [Ethereum Development Guide](https://ethereum.org/developers)
- [Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

Happy coding! 🚀
`;

const GUIDE_CONTENT = (topic: string) => `
# ${topic} Complete Guide

${topic} has revolutionized the blockchain space, offering unprecedented opportunities for developers and users alike. This comprehensive guide covers everything you need to know.

## Table of Contents

1. [What is ${topic}?](#what-is-${topic.toLowerCase().replace(/\s/g, "-")})
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [Advanced Concepts](#advanced-concepts)
5. [Best Practices](#best-practices)
6. [Common Pitfalls](#common-pitfalls)
7. [Future Outlook](#future-outlook)

## What is ${topic}?

${topic} represents a paradigm shift in how we think about decentralized applications and blockchain technology. It provides:

- **Decentralization**: No single point of failure
- **Transparency**: All transactions are publicly verifiable
- **Programmability**: Smart contracts enable complex logic
- **Interoperability**: Seamless integration with other protocols

## Key Features

### 1. Core Architecture

The ${topic} architecture is built on several key principles:

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │────│  Smart Contract │────│   Blockchain    │
│     Layer       │    │     Layer       │    │     Layer       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

### 2. Technical Specifications

| Feature | Specification |
|---------|--------------|
| Block Time | ~2-15 seconds |
| Consensus | Proof of Stake |
| Throughput | 1000+ TPS |
| Smart Contracts | Yes |

### 3. Development Tools

The ${topic} ecosystem provides robust tooling:

- **IDEs**: Remix, VSCode extensions
- **Frameworks**: Hardhat, Foundry, Truffle
- **Testing**: Mocha, Chai, Jest
- **Deployment**: Automated CI/CD pipelines

## Getting Started

### Prerequisites

\`\`\`bash
# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node

# Install development tools
npm install -g hardhat-cli
\`\`\`

### Your First ${topic} Project

\`\`\`bash
# Create new project
mkdir my-${topic.toLowerCase().replace(/\s/g, "-")}-app
cd my-${topic.toLowerCase().replace(/\s/g, "-")}-app

# Initialize
npm init -y
npm install ethers hardhat
\`\`\`

## Advanced Concepts

### Gas Optimization

Optimizing gas usage is crucial for ${topic} applications:

\`\`\`solidity
// ❌ Expensive
function updateMultiple(uint256[] memory values) external {
    for (uint i = 0; i < values.length; i++) {
        storage[i] = values[i];
    }
}

// ✅ Optimized
function updateMultipleOptimized(uint256[] calldata values) external {
    uint256 length = values.length;
    for (uint i; i < length;) {
        storage[i] = values[i];
        unchecked { ++i; }
    }
}
\`\`\`

### Security Patterns

Implement these security patterns in your ${topic} applications:

1. **Checks-Effects-Interactions**
2. **Reentrancy Guards** 
3. **Access Control**
4. **Input Validation**

### Performance Monitoring

Monitor your ${topic} application performance:

\`\`\`javascript
// Track transaction metrics
const trackTransaction = async (txHash) => {
  const receipt = await provider.getTransactionReceipt(txHash);
  console.log(\`Gas used: \${receipt.gasUsed}\`);
  console.log(\`Block number: \${receipt.blockNumber}\`);
};
\`\`\`

## Best Practices

### 1. Development Workflow

Follow this proven workflow:

1. **Plan** → Define requirements and architecture
2. **Develop** → Write smart contracts and frontend
3. **Test** → Comprehensive testing suite
4. **Audit** → Security review and optimization
5. **Deploy** → Staged deployment to testnets then mainnet
6. **Monitor** → Ongoing performance and security monitoring

### 2. Code Quality

Maintain high code quality standards:

- Use linting tools (Solhint, ESLint)
- Follow naming conventions
- Write comprehensive documentation
- Implement continuous integration

### 3. Security Checklist

- [ ] Input validation implemented
- [ ] Access controls in place
- [ ] Reentrancy protection added
- [ ] Integer overflow/underflow prevented
- [ ] External contract interactions secured
- [ ] Emergency pause mechanism implemented

## Common Pitfalls

### 1. Gas Limit Issues

Always account for gas limits in your calculations:

\`\`\`solidity
// Check gas before loops
require(gasleft() > MINIMUM_GAS, "Insufficient gas");
\`\`\`

### 2. Front-Running Attacks

Protect against MEV and front-running:

- Use commit-reveal schemes
- Implement time delays
- Consider private mempools

### 3. Oracle Manipulation

When using external data:

- Use multiple oracle sources
- Implement price deviation checks
- Add time-weighted averages

## Future Outlook

The ${topic} ecosystem continues to evolve rapidly:

### Upcoming Features

- **Enhanced Scalability**: Layer 2 solutions
- **Improved UX**: Account abstraction
- **Cross-Chain**: Better interoperability
- **Privacy**: Zero-knowledge proofs

### Market Trends

Current trends shaping the ${topic} landscape:

1. Institutional adoption increasing
2. Regulatory clarity improving
3. Developer tooling advancing
4. User experience enhancing

## Conclusion

${topic} represents a fundamental shift in how we build and interact with digital applications. By following the practices and principles outlined in this guide, you'll be well-equipped to build successful ${topic} projects.

### Additional Resources

- [${topic} Official Documentation](https://docs.example.com)
- [Developer Community Discord](https://discord.gg/example)
- [GitHub Repository](https://github.com/example/${topic.toLowerCase()})
- [Stack Overflow Tag](https://stackoverflow.com/questions/tagged/${topic.toLowerCase()})

Stay updated with the latest ${topic} developments by following our blog and joining our community!
`;

// List of valid Pexels images for blogs
const VALID_BLOG_IMAGES: string[] = [
  "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

// Utility functions
const randomChoice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
const randomChoices = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate slug from title
const generateSlug = (title: string, id: string): string => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    id.slice(-8)
  );
};

// Generate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Generate blog post
const generateBlogPost = (): BlogPost => {
  const id = new ObjectId().toString();
  const author = randomChoice(AUTHORS);
  const category = randomChoice(CATEGORIES);
  const topics = randomChoices(TOPICS_POOL, randomInt(3, 6));

  // Generate title
  const template = randomChoice(TITLE_TEMPLATES);
  const topic = randomChoice(topics);
  const type = randomChoice(APPLICATION_TYPES);
  const tech = randomChoice(TECHNOLOGIES);
  const alternative = randomChoice(topics.filter((t) => t !== topic));
  const integration = randomChoice(TECHNOLOGIES.filter((t) => t !== tech));

  const title = template
    .replace("{topic}", topic)
    .replace("{type}", type)
    .replace("{tech}", tech)
    .replace("{alternative}", alternative)
    .replace("{integration}", integration);

  // Generate content based on title type
  let content: string;
  if (
    title.includes("Step-by-Step") ||
    title.includes("Tutorial") ||
    title.includes("How to Build")
  ) {
    content = TUTORIAL_CONTENT(topic, tech);
  } else {
    content = GUIDE_CONTENT(topic);
  }

  // Generate excerpt from content
  const contentWords = content
    .replace(/[#*`\n]/g, " ")
    .split(/\s+/)
    .slice(0, 40);
  const excerpt = contentWords.join(" ") + "...";

  const publishDate = new Date(
    Date.now() - randomInt(1, 365) * 24 * 60 * 60 * 1000,
  );

  const updatedAt = new Date(
    publishDate.getTime() + randomInt(0, 30) * 24 * 60 * 60 * 1000,
  );

  const status: BlogStatus = randomChoice([
    "published",
    "published",
    "published",
    "published", // Higher chance of published
    "draft",
    "archived",
  ]);

  const featured = Math.random() < 0.15; // 15% chance of being featured
  const views = randomInt(100, 50000);
  const comments = randomInt(5, 500);

  return {
    id,
    title,
    slug: generateSlug(title, id),
    content,
    excerpt: excerpt.substring(0, 300),
    category,
    readTime: calculateReadTime(content),
    publishDate,
    updatedAt,
    topics,
    image: randomChoice(VALID_BLOG_IMAGES),
    featured,
    status,
    views,
    comments,
    author,
    relatedProduct:
      Math.random() < 0.3
        ? randomChoice(["service-1", "service-2", "product-1"])
        : undefined,
  };
};

// Main execution function
async function seedDatabase(): Promise<void> {
  let client: MongoClient | undefined;

  try {
    console.log("🚀 Starting blog database seeding...");
    console.log(`📝 Generating ${NUM_BLOGS} blog posts...`);

    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Generate blog posts
    const blogPosts: BlogPost[] = [];
    for (let i = 0; i < NUM_BLOGS; i++) {
      blogPosts.push(generateBlogPost());

      // Log progress
      if ((i + 1) % 10 === 0) {
        console.log(`📝 Generated ${i + 1}/${NUM_BLOGS} blog posts...`);
      }
    }

    // Clear existing blogs (optional)
    const shouldClear: boolean = process.env.CLEAR_EXISTING === "true";
    if (shouldClear) {
      const deleteResult = await collection.deleteMany({});
      console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing blogs`);
    }

    // Transform blogs for MongoDB (add createdBy field)
    const blogsForDB = blogPosts.map((blog) => ({
      ...blog,
      createdBy: "admin-user-id", // You might want to make this dynamic
      _id: undefined, // Let MongoDB generate ObjectId
    }));

    // Insert blogs
    const result = await collection.insertMany(blogsForDB);
    console.log(`✅ Inserted ${result.insertedCount} blog posts successfully!`);

    // Create indexes for better performance
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ status: 1 });
    await collection.createIndex({ featured: 1 });
    await collection.createIndex({ publishDate: -1 });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ topics: 1 });
    await collection.createIndex({ "author.name": 1 });

    console.log("📊 Created database indexes");

    // Log statistics
    const published = blogPosts.filter(
      (blog) => blog.status === "published",
    ).length;
    const drafts = blogPosts.filter((blog) => blog.status === "draft").length;
    const archived = blogPosts.filter(
      (blog) => blog.status === "archived",
    ).length;
    const featured = blogPosts.filter((blog) => blog.featured).length;

    console.log("\n📈 Generation Statistics:");
    console.log(`   Published: ${published}`);
    console.log(`   Drafts: ${drafts}`);
    console.log(`   Archived: ${archived}`);
    console.log(`   Featured: ${featured}`);
    console.log(
      `   Categories: ${[...new Set(blogPosts.map((b) => b.category))].length}`,
    );
    console.log(
      `   Unique Authors: ${[...new Set(blogPosts.map((b) => b.author.name))].length}`,
    );
  } catch (error: unknown) {
    console.error("❌ Error seeding blog database:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
}

// Run if called directly
const __filename: string = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  seedDatabase()
    .then(() => {
      console.log("🎉 Blog database seeding completed!");
      process.exit(0);
    })
    .catch((error: unknown) => {
      console.error("💥 Blog seeding failed:", error);
      process.exit(1);
    });
}

export default { generateBlogPost, seedDatabase };
