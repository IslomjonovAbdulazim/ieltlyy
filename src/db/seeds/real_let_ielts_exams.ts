import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();

    // Create 20 Real LET IELTS exams
    const sampleTests = Array.from({ length: 20 }, (_, index) => ({
        title: `Real LET Exam ${index + 1}`,
        description: 'Complete IELTS practice exam covering all four sections',
        type: 'Full',
        duration: 180,
        totalMarks: 100,
        createdAt: currentTimestamp,
    }));

    await db.insert(tests).values(sampleTests);

    // Topics for variety across 20 exams
    const topics = [
        'Technology and innovation',
        'Education and learning',
        'Environment and climate',
        'Health and lifestyle',
        'Culture and society',
        'Travel and tourism',
        'Work and careers',
        'Science and research',
        'Arts and entertainment',
        'Social issues',
        'Urban development',
        'Food and nutrition',
        'Transportation systems',
        'Communication trends',
        'Economic growth',
        'Space exploration',
        'Mental health awareness',
        'Renewable energy',
        'Cultural preservation',
        'Digital transformation'
    ];

    // Create test parts for each test
    for (let testNumber = 1; testNumber <= 20; testNumber++) {
        const topic = topics[testNumber - 1];
        
        // PART 1 - LISTENING
        const listeningPart = {
            testId: testNumber,
            partNumber: 1,
            title: 'Listening',
            instructions: 'You will hear a recording. Answer the questions as you listen.',
            content: 'Listening test content and context',
            audioUrl: `/audio/listening-test-${testNumber}.mp3`,
            listeningScript: getListeningScript(testNumber, topic),
        };

        // PART 2 - READING
        const readingPart = {
            testId: testNumber,
            partNumber: 2,
            title: 'Reading',
            instructions: 'Read the passage and answer the questions.',
            content: getReadingPassage(testNumber, topic),
            audioUrl: null,
            listeningScript: null,
        };

        // PART 3 - WRITING
        const writingPart = {
            testId: testNumber,
            partNumber: 3,
            title: 'Writing',
            instructions: 'Complete both writing tasks.',
            content: 'Task 1: Describe the graph/chart. Task 2: Write an essay on the given topic.',
            audioUrl: null,
            listeningScript: null,
        };

        // PART 4 - SPEAKING
        const speakingPart = {
            testId: testNumber,
            partNumber: 4,
            title: 'Speaking',
            instructions: 'Record your responses to the speaking prompts.',
            content: 'Speaking test with three parts: introduction, individual long turn, two-way discussion.',
            audioUrl: null,
            listeningScript: null,
        };

        await db.insert(testParts).values([listeningPart, readingPart, writingPart, speakingPart]);

        // Create questions for each part
        const partOffset = (testNumber - 1) * 4;

        // LISTENING QUESTIONS (10 questions)
        const listeningQuestions = getListeningQuestions(partOffset + 1, testNumber);
        await db.insert(questions).values(listeningQuestions);

        // READING QUESTIONS (10 questions)
        const readingQuestions = getReadingQuestions(partOffset + 2, testNumber, topic);
        await db.insert(questions).values(readingQuestions);

        // WRITING QUESTIONS (2 questions)
        const writingQuestions = getWritingQuestions(partOffset + 3, testNumber, topic);
        await db.insert(questions).values(writingQuestions);

        // SPEAKING QUESTIONS (6 questions)
        const speakingQuestions = getSpeakingQuestions(partOffset + 4, testNumber, topic);
        await db.insert(questions).values(speakingQuestions);
    }

    console.log('✅ Real LET IELTS exams seeder completed successfully');
}

function getListeningScript(testNumber: number, topic: string): string {
    const scripts = [
        "Good morning, this is Sarah from City University Student Services. I'm calling about your application for student accommodation. I need to confirm some details with you. First, can you spell your surname for me? It's Johnson, J-O-H-N-S-O-N. Thank you. Now, I see you've applied for a single room in Block C. The rent is £150 per week, payable monthly in advance. The room includes basic furniture and internet access. You'll need to pay a security deposit of £300 when you move in. The earliest available move-in date is September 15th. Would that suit you? Great. Just to confirm, your contact number is 07845 123456, correct? Perfect. I'll email you the tenancy agreement today.",
        
        "Welcome to today's lecture on renewable energy sources. Today we'll explore three main types of renewable energy: solar, wind, and hydroelectric power. Solar energy harnesses sunlight through photovoltaic panels. The efficiency of modern solar panels has improved dramatically, reaching up to 22% efficiency in commercial applications. Wind energy captures kinetic energy through turbines. Denmark generates over 40% of its electricity from wind power. Hydroelectric power uses flowing water to generate electricity. The Three Gorges Dam in China produces 22,500 megawatts of power. These renewable sources are crucial for reducing carbon emissions and combating climate change. By 2030, renewable energy could provide 30% of global electricity needs.",
        
        "Hi everyone, I'm Dr. Martinez, your tour guide for today's museum visit. We'll be exploring the Ancient Civilizations gallery. Our first stop is the Egyptian section, featuring artifacts from 3000 BCE. The centerpiece is a limestone sarcophagus discovered in the Valley of Kings in 1923. Next, we'll visit the Roman collection, including marble sculptures and pottery from Pompeii. The tour lasts approximately 90 minutes with a 15-minute break halfway through. Please stay with the group and feel free to ask questions. Photography is permitted but no flash photography please. The museum shop offers books and replicas of our most popular items. Let's begin our journey through history."
    ];
    
    return scripts[testNumber % 3] || scripts[0];
}

function getReadingPassage(testNumber: number, topic: string): string {
    const passages = {
        'Technology and innovation': "The rapid advancement of artificial intelligence has transformed numerous industries over the past decade. Machine learning algorithms now power everything from recommendation systems to autonomous vehicles. However, this technological revolution brings both opportunities and challenges. Companies must invest heavily in data infrastructure and skilled personnel to remain competitive. Meanwhile, concerns about job displacement and privacy continue to grow. Recent studies suggest that while AI may eliminate certain roles, it also creates new opportunities in data science, AI ethics, and human-AI collaboration. The key to successful AI implementation lies in thoughtful integration that augments rather than replaces human capabilities.",
        
        'Education and learning': "Traditional classroom-based education is evolving rapidly in the digital age. Online learning platforms have democratized access to quality education, allowing students worldwide to attend courses from prestigious institutions. The COVID-19 pandemic accelerated this transformation, forcing educational institutions to adapt quickly to remote learning models. Research indicates that blended learning approaches, combining face-to-face and online elements, often produce superior outcomes compared to purely traditional or online methods. However, the digital divide remains a significant challenge, with students from disadvantaged backgrounds lacking access to necessary technology and reliable internet connections.",
        
        'Environment and climate': "Climate change represents one of the most pressing challenges of our time. Global temperatures have risen by approximately 1.1 degrees Celsius since pre-industrial times, leading to more frequent extreme weather events. The scientific consensus attributes this warming primarily to human activities, particularly the burning of fossil fuels. Mitigation strategies include transitioning to renewable energy sources, improving energy efficiency, and implementing carbon pricing mechanisms. Additionally, adaptation measures such as flood defenses and drought-resistant agriculture are becoming increasingly necessary. International cooperation through agreements like the Paris Climate Accord is essential for addressing this global challenge effectively."
    };
    
    return passages[topic] || passages['Technology and innovation'];
}

function getListeningQuestions(partId: number, testNumber: number) {
    return [
        {
            partId: partId,
            questionNumber: 1,
            questionText: "What is the caller's name?",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "Sarah",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 2,
            questionText: "What is the weekly rent for the room?",
            questionType: "multiple_choice",
            options: ["£120", "£150", "£180", "£200"],
            correctAnswer: "£150",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 3,
            questionText: "The security deposit is £300.",
            questionType: "true_false",
            options: ["True", "False"],
            correctAnswer: "True",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 4,
            questionText: "The move-in date is September ___.",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "15th",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 5,
            questionText: "What is included with the room?",
            questionType: "multiple_choice",
            options: ["Furniture only", "Internet only", "Furniture and internet", "Nothing included"],
            correctAnswer: "Furniture and internet",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 6,
            questionText: "The room is located in Block ___.",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "C",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 7,
            questionText: "Payment is required monthly in advance.",
            questionType: "true_false",
            options: ["True", "False"],
            correctAnswer: "True",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 8,
            questionText: "The contact number ends with which digits?",
            questionType: "multiple_choice",
            options: ["123456", "654321", "111222", "987654"],
            correctAnswer: "123456",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 9,
            questionText: "What will be emailed today?",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "tenancy agreement",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 10,
            questionText: "The caller is from Student Services.",
            questionType: "true_false",
            options: ["True", "False"],
            correctAnswer: "True",
            marks: 1,
        }
    ];
}

function getReadingQuestions(partId: number, testNumber: number, topic: string) {
    return [
        {
            partId: partId,
            questionNumber: 1,
            questionText: "According to the passage, AI has transformed industries over the past ___.",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "decade",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 2,
            questionText: "What powers recommendation systems according to the text?",
            questionType: "multiple_choice",
            options: ["Databases", "Machine learning algorithms", "Human analysts", "Statistical models"],
            correctAnswer: "Machine learning algorithms",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 3,
            questionText: "AI will completely replace human workers in all industries.",
            questionType: "true_false_not_given",
            options: ["True", "False", "Not Given"],
            correctAnswer: "False",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 4,
            questionText: "Companies need significant investment in data infrastructure.",
            questionType: "true_false_not_given",
            options: ["True", "False", "Not Given"],
            correctAnswer: "True",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 5,
            questionText: "Which concern about AI is mentioned in the passage?",
            questionType: "multiple_choice",
            options: ["High costs", "Job displacement", "Technical complexity", "Market competition"],
            correctAnswer: "Job displacement",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 6,
            questionText: "AI creates new opportunities in ___ science.",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "data",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 7,
            questionText: "The passage suggests AI should augment human capabilities.",
            questionType: "true_false_not_given",
            options: ["True", "False", "Not Given"],
            correctAnswer: "True",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 8,
            questionText: "What type of personnel do companies need for AI?",
            questionType: "multiple_choice",
            options: ["Marketing staff", "Skilled personnel", "General workers", "Management only"],
            correctAnswer: "Skilled personnel",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 9,
            questionText: "AI ethics is mentioned as a new career opportunity.",
            questionType: "true_false_not_given",
            options: ["True", "False", "Not Given"],
            correctAnswer: "True",
            marks: 1,
        },
        {
            partId: partId,
            questionNumber: 10,
            questionText: "Successful AI implementation requires ___ integration.",
            questionType: "fill_blank",
            options: null,
            correctAnswer: "thoughtful",
            marks: 1,
        }
    ];
}

function getWritingQuestions(partId: number, testNumber: number, topic: string) {
    const chartTypes = ['bar chart', 'line graph', 'pie chart', 'table', 'process diagram'];
    const essayTopics = {
        'Technology and innovation': 'Some people believe that technology makes life more complicated. Others argue that it simplifies daily tasks. Discuss both views and give your opinion.',
        'Education and learning': 'Online education has become increasingly popular. What are the advantages and disadvantages of online learning compared to traditional classroom education?',
        'Environment and climate': 'Climate change is a global problem that requires international cooperation. What measures should governments take to address this issue?'
    };

    return [
        {
            partId: partId,
            questionNumber: 1,
            questionText: `The ${chartTypes[testNumber % chartTypes.length]} shows data about ${topic.toLowerCase()} trends from 2020 to 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
            questionType: "essay",
            options: null,
            correctAnswer: null,
            marks: 25,
        },
        {
            partId: partId,
            questionNumber: 2,
            questionText: essayTopics[topic] || essayTopics['Technology and innovation'],
            questionType: "essay",
            options: null,
            correctAnswer: null,
            marks: 25,
        }
    ];
}

function getSpeakingQuestions(partId: number, testNumber: number, topic: string) {
    return [
        {
            partId: partId,
            questionNumber: 1,
            questionText: "Can you tell me about your hometown?",
            questionType: "speaking",
            options: null,
            correctAnswer: null,
            marks: 5,
        },
        {
            partId: partId,
            questionNumber: 2,
            questionText: "What do you like to do in your free time?",
            questionType: "speaking",
            options: null,
            correctAnswer: null,
            marks: 5,
        },
        {
            partId: partId,
            questionNumber: 3,
            questionText: `Describe a recent development in ${topic.toLowerCase()} that interests you. You should say: what the development is, how you learned about it, why it interests you, and explain how it might affect people's lives. You have one minute to prepare and two minutes to speak.`,
            questionType: "speaking",
            options: null,
            correctAnswer: null,
            marks: 10,
        },
        {
            partId: partId,
            questionNumber: 4,
            questionText: `How important is ${topic.toLowerCase()} in today's society?`,
            questionType: "speaking",
            options: null,
            correctAnswer: null,
            marks: 5,
        },
        {
            partId: partId,
            questionNumber: 5,
            questionText: `What changes do you expect to see in ${topic.toLowerCase()} in the future?`,
            questionType: "speaking",
            options: null,
            correctAnswer: null,
            marks: 5,
        },
        {
            partId: partId,
            questionNumber: 6,
            questionText: `Do you think government should regulate developments in ${topic.toLowerCase()}? Why or why not?`,
            questionType: "speaking",
            options: null,
            correctAnswer: null,
            marks: 5,
        }
    ];
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});