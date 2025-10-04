import mongoose from "mongoose";
import { config } from "dotenv";
import { User } from "../models/User";
import { Test } from "../models/Test";
import path from "path";

// Load environment variables
config({ path: path.join(__dirname, "../../../.env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ielts-portal";
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@ielts-portal.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Admin123!";

async function seed() {
  try {
    console.log("🌱 Starting seed...");
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Create admin user
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    let adminId;
    
    if (existingAdmin) {
      console.log("ℹ️  Admin user already exists");
      adminId = existingAdmin._id;
    } else {
      const admin = await User.create({
        name: "Admin User",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin"
      });
      adminId = admin._id;
      console.log("✅ Created admin user:", ADMIN_EMAIL);
    }

    // Seed Listening Test with 4 parts, 10 questions each (40 total)
    const listeningTest = await Test.create({
      title: "IELTS Listening Practice Test 1",
      type: "Listening",
      description: "Complete IELTS Listening test with 4 parts and 40 questions",
      createdBy: adminId,
      duration: 40,
      totalMarks: 40,
      parts: [
        {
          partNumber: 1,
          title: "Part 1 - Social Conversation",
          instructions: "You will hear a conversation between two people about accommodation. Listen and answer questions 1-10.",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          questions: [
            {
              questionNumber: 1,
              questionType: "fill-blank",
              questionText: "The caller's name is ___________.",
              correctAnswer: "John Smith"
            },
            {
              questionNumber: 2,
              questionType: "fill-blank",
              questionText: "The property is located in ___________ Street.",
              correctAnswer: "Park"
            },
            {
              questionNumber: 3,
              questionType: "multiple-choice",
              questionText: "The rent per week is:",
              options: ["£150", "£180", "£200", "£250"],
              correctAnswer: "£180"
            },
            {
              questionNumber: 4,
              questionType: "fill-blank",
              questionText: "The deposit required is £___________.",
              correctAnswer: "360"
            },
            {
              questionNumber: 5,
              questionType: "multiple-choice",
              questionText: "The apartment has:",
              options: ["1 bedroom", "2 bedrooms", "3 bedrooms", "4 bedrooms"],
              correctAnswer: "2 bedrooms"
            },
            {
              questionNumber: 6,
              questionType: "fill-blank",
              questionText: "Bills are included except for ___________.",
              correctAnswer: "electricity"
            },
            {
              questionNumber: 7,
              questionType: "multiple-choice",
              questionText: "The nearest train station is:",
              options: ["5 minutes away", "10 minutes away", "15 minutes away", "20 minutes away"],
              correctAnswer: "10 minutes away"
            },
            {
              questionNumber: 8,
              questionType: "fill-blank",
              questionText: "The landlord's phone number is ___________.",
              correctAnswer: "07700 900123"
            },
            {
              questionNumber: 9,
              questionType: "multiple-choice",
              questionText: "Viewing is available on:",
              options: ["Monday", "Tuesday", "Wednesday", "Friday"],
              correctAnswer: "Wednesday"
            },
            {
              questionNumber: 10,
              questionType: "fill-blank",
              questionText: "The viewing time is at ___________ pm.",
              correctAnswer: "3:30"
            }
          ]
        },
        {
          partNumber: 2,
          title: "Part 2 - Monologue",
          instructions: "You will hear a tour guide talking about a museum. Listen and answer questions 11-20.",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          questions: [
            {
              questionNumber: 11,
              questionType: "fill-blank",
              questionText: "The museum was founded in ___________.",
              correctAnswer: "1895"
            },
            {
              questionNumber: 12,
              questionType: "multiple-choice",
              questionText: "The museum specializes in:",
              options: ["Modern art", "Ancient history", "Natural science", "Technology"],
              correctAnswer: "Ancient history"
            },
            {
              questionNumber: 13,
              questionType: "fill-blank",
              questionText: "The Egyptian collection has over ___________ artifacts.",
              correctAnswer: "5000"
            },
            {
              questionNumber: 14,
              questionType: "multiple-choice",
              questionText: "The special exhibition opens:",
              options: ["This Friday", "Next Monday", "Next Friday", "In two weeks"],
              correctAnswer: "Next Monday"
            },
            {
              questionNumber: 15,
              questionType: "fill-blank",
              questionText: "Adult tickets cost £___________.",
              correctAnswer: "12"
            },
            {
              questionNumber: 16,
              questionType: "multiple-choice",
              questionText: "Audio guides are available in:",
              options: ["3 languages", "5 languages", "7 languages", "10 languages"],
              correctAnswer: "7 languages"
            },
            {
              questionNumber: 17,
              questionType: "fill-blank",
              questionText: "The museum café is located on the ___________ floor.",
              correctAnswer: "third"
            },
            {
              questionNumber: 18,
              questionType: "multiple-choice",
              questionText: "Photography is allowed:",
              options: ["Everywhere", "Nowhere", "Only in main hall", "Except special exhibitions"],
              correctAnswer: "Except special exhibitions"
            },
            {
              questionNumber: 19,
              questionType: "fill-blank",
              questionText: "The museum closes at ___________ pm on weekdays.",
              correctAnswer: "6"
            },
            {
              questionNumber: 20,
              questionType: "multiple-choice",
              questionText: "Free guided tours are available:",
              options: ["Every hour", "Every 2 hours", "Three times daily", "Once daily"],
              correctAnswer: "Three times daily"
            }
          ]
        },
        {
          partNumber: 3,
          title: "Part 3 - Academic Discussion",
          instructions: "You will hear two students discussing a research project. Listen and answer questions 21-30.",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          questions: [
            {
              questionNumber: 21,
              questionType: "multiple-choice",
              questionText: "The students are working on a project about:",
              options: ["Climate change", "Urban development", "Renewable energy", "Marine biology"],
              correctAnswer: "Renewable energy"
            },
            {
              questionNumber: 22,
              questionType: "fill-blank",
              questionText: "They need to submit the project by ___________.",
              correctAnswer: "March 15th"
            },
            {
              questionNumber: 23,
              questionType: "multiple-choice",
              questionText: "The main challenge they face is:",
              options: ["Lack of data", "Time constraints", "Budget limitations", "Equipment access"],
              correctAnswer: "Lack of data"
            },
            {
              questionNumber: 24,
              questionType: "fill-blank",
              questionText: "Professor ___________ suggested the research methodology.",
              correctAnswer: "Thompson"
            },
            {
              questionNumber: 25,
              questionType: "multiple-choice",
              questionText: "They decided to focus on:",
              options: ["Solar panels", "Wind turbines", "Hydroelectric power", "Geothermal energy"],
              correctAnswer: "Wind turbines"
            },
            {
              questionNumber: 26,
              questionType: "fill-blank",
              questionText: "The case study will examine ___________ European countries.",
              correctAnswer: "five"
            },
            {
              questionNumber: 27,
              questionType: "multiple-choice",
              questionText: "The presentation should be:",
              options: ["10 minutes", "15 minutes", "20 minutes", "30 minutes"],
              correctAnswer: "20 minutes"
            },
            {
              questionNumber: 28,
              questionType: "fill-blank",
              questionText: "The library has access to the ___________ database.",
              correctAnswer: "EnergyWatch"
            },
            {
              questionNumber: 29,
              questionType: "multiple-choice",
              questionText: "They plan to meet next:",
              options: ["Monday morning", "Tuesday afternoon", "Wednesday morning", "Thursday afternoon"],
              correctAnswer: "Tuesday afternoon"
            },
            {
              questionNumber: 30,
              questionType: "fill-blank",
              questionText: "The maximum word count for the report is ___________.",
              correctAnswer: "3000"
            }
          ]
        },
        {
          partNumber: 4,
          title: "Part 4 - Academic Lecture",
          instructions: "You will hear a lecture about environmental psychology. Listen and answer questions 31-40.",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          questions: [
            {
              questionNumber: 31,
              questionType: "multiple-choice",
              questionText: "Environmental psychology primarily studies:",
              options: ["Plant behavior", "Animal habitats", "Human-environment interaction", "Climate patterns"],
              correctAnswer: "Human-environment interaction"
            },
            {
              questionNumber: 32,
              questionType: "fill-blank",
              questionText: "The field emerged in the ___________s.",
              correctAnswer: "1960"
            },
            {
              questionNumber: 33,
              questionType: "multiple-choice",
              questionText: "Natural light in workplaces can increase productivity by:",
              options: ["5-10%", "15-20%", "25-30%", "35-40%"],
              correctAnswer: "15-20%"
            },
            {
              questionNumber: 34,
              questionType: "fill-blank",
              questionText: "The concept of 'personal space' varies across ___________.",
              correctAnswer: "cultures"
            },
            {
              questionNumber: 35,
              questionType: "multiple-choice",
              questionText: "Green spaces in cities help reduce:",
              options: ["Noise only", "Stress only", "Both noise and stress", "Neither"],
              correctAnswer: "Both noise and stress"
            },
            {
              questionNumber: 36,
              questionType: "fill-blank",
              questionText: "Color psychology suggests blue promotes ___________.",
              correctAnswer: "calmness"
            },
            {
              questionNumber: 37,
              questionType: "multiple-choice",
              questionText: "The ideal office temperature for productivity is:",
              options: ["18-20°C", "21-23°C", "24-26°C", "27-29°C"],
              correctAnswer: "21-23°C"
            },
            {
              questionNumber: 38,
              questionType: "fill-blank",
              questionText: "Open-plan offices can reduce ___________ between colleagues.",
              correctAnswer: "barriers"
            },
            {
              questionNumber: 39,
              questionType: "multiple-choice",
              questionText: "Hospital patients recover faster with:",
              options: ["Bright lights", "Nature views", "Art displays", "Music therapy"],
              correctAnswer: "Nature views"
            },
            {
              questionNumber: 40,
              questionType: "fill-blank",
              questionText: "Future research will focus on ___________ city design.",
              correctAnswer: "sustainable"
            }
          ]
        }
      ]
    });
    console.log("✅ Created Listening test with 4 parts (40 questions: 10+10+10+10)");

    // Seed Reading Test
    const readingTest = await Test.create({
      title: "IELTS Reading Practice Test 1",
      type: "Reading",
      description: "Complete reading test with 3 passages and 40 questions",
      createdBy: adminId,
      parts: [
        {
          partNumber: 1,
          title: "Passage 1",
          instructions: "Read the passage and answer questions 1-14",
          passage: "This is a placeholder passage for Reading Part 1. In the actual test, this would be a full academic or general text...",
          questions: Array.from({ length: 14 }, (_, i) => ({
            questionNumber: i + 1,
            questionType: i < 7 ? "mcq" : "true-false-not-given",
            questionText: `Question ${i + 1}: Sample reading question`,
            options: i < 7 ? ["Option A", "Option B", "Option C", "Option D"] : undefined,
            correctAnswer: i < 7 ? "Option A" : "True"
          }))
        },
        {
          partNumber: 2,
          title: "Passage 2",
          instructions: "Read the passage and answer questions 15-27",
          passage: "This is a placeholder passage for Reading Part 2...",
          questions: Array.from({ length: 13 }, (_, i) => ({
            questionNumber: i + 15,
            questionType: "fill-blank",
            questionText: `Question ${i + 15}: Complete the sentence with NO MORE THAN TWO WORDS`,
            correctAnswer: "sample answer"
          }))
        },
        {
          partNumber: 3,
          title: "Passage 3",
          instructions: "Read the passage and answer questions 28-40",
          passage: "This is a placeholder passage for Reading Part 3...",
          questions: Array.from({ length: 13 }, (_, i) => ({
            questionNumber: i + 28,
            questionType: "matching",
            questionText: `Question ${i + 28}: Match the heading to the paragraph`,
            options: ["Heading A", "Heading B", "Heading C", "Heading D"],
            correctAnswer: "Heading A"
          }))
        }
      ]
    });
    console.log("✅ Created Reading test with 3 parts (40 questions: 14+13+13)");

    // Seed Writing Test
    const writingTest = await Test.create({
      title: "IELTS Writing Practice Test 1",
      type: "Writing",
      description: "Complete writing test with 2 tasks",
      createdBy: adminId,
      parts: [
        {
          partNumber: 1,
          title: "Task 1",
          instructions: "Write at least 150 words describing the chart/graph/diagram",
          questions: [{
            questionNumber: 1,
            questionType: "writing-prompt",
            questionText: "The chart below shows the percentage of households in different age groups using the internet in 2019. Summarize the information by selecting and reporting the main features, and make comparisons where relevant."
          }]
        },
        {
          partNumber: 2,
          title: "Task 2",
          instructions: "Write at least 250 words giving your opinion on the topic",
          questions: [{
            questionNumber: 1,
            questionType: "writing-prompt",
            questionText: "Some people believe that studying at university or college is the best route to a successful career, while others believe that it is better to get a job straight after school. Discuss both views and give your opinion."
          }]
        }
      ]
    });
    console.log("✅ Created Writing test with 2 tasks");

    // Seed Speaking Test
    const speakingTest = await Test.create({
      title: "IELTS Speaking Practice Test 1",
      type: "Speaking",
      description: "Complete speaking test with 3 parts",
      createdBy: adminId,
      parts: [
        {
          partNumber: 1,
          title: "Part 1 - Introduction and Interview",
          instructions: "Answer questions about familiar topics (4-5 minutes)",
          questions: [
            {
              questionNumber: 1,
              questionType: "speaking-prompt",
              questionText: "Let's talk about your hometown. Where are you from?"
            },
            {
              questionNumber: 2,
              questionType: "speaking-prompt",
              questionText: "What do you like most about your hometown?"
            },
            {
              questionNumber: 3,
              questionType: "speaking-prompt",
              questionText: "Has your hometown changed much since you were a child?"
            }
          ]
        },
        {
          partNumber: 2,
          title: "Part 2 - Long Turn",
          instructions: "Speak for 1-2 minutes on the topic (1 minute preparation time)",
          questions: [{
            questionNumber: 1,
            questionType: "speaking-prompt",
            questionText: "Describe a book you have recently read. You should say:\n- What the book was about\n- When you read it\n- Why you chose to read it\nAnd explain whether you enjoyed reading this book or not."
          }]
        },
        {
          partNumber: 3,
          title: "Part 3 - Discussion",
          instructions: "Discuss more abstract ideas related to Part 2 (4-5 minutes)",
          questions: [
            {
              questionNumber: 1,
              questionType: "speaking-prompt",
              questionText: "Do you think reading books is important for children?"
            },
            {
              questionNumber: 2,
              questionType: "speaking-prompt",
              questionText: "How has technology changed the way people read?"
            },
            {
              questionNumber: 3,
              questionType: "speaking-prompt",
              questionText: "What is the future of printed books?"
            }
          ]
        }
      ]
    });
    console.log("✅ Created Speaking test with 3 parts");

    console.log("\n✨ Seed completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("   - Replace placeholder audio URLs in Listening test parts with real audio files");
    console.log("   - Replace placeholder passages in Reading test with actual academic texts");
    console.log("   - Customize question content as needed");
    console.log(`\n👤 Admin credentials: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);

  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run seed
seed().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});