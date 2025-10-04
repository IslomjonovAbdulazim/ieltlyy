import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';

async function main() {
    // Insert 5 IELTS speaking tests and capture their IDs
    const insertedTests = await db.insert(tests).values([
        {
            title: 'Technology and Modern Life',
            description: 'IELTS Speaking Test focusing on technology, digital devices, and their impact on daily life',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'Education and Learning',
            description: 'IELTS Speaking Test about educational experiences, learning methods, and academic life',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            title: 'Travel and Culture',
            description: 'IELTS Speaking Test covering travel experiences, cultural differences, and tourism',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            title: 'Environment and Nature',
            description: 'IELTS Speaking Test about environmental issues, nature conservation, and sustainability',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            title: 'Work and Career',
            description: 'IELTS Speaking Test focusing on career choices, work experiences, and professional development',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-19').toISOString(),
        }
    ]).returning();

    // Extract test IDs for reference
    const testIds = insertedTests.map(test => test.id);

    // Insert test parts for all tests and capture their IDs
    const insertedParts = await db.insert(testParts).values([
        // Test 1: Technology and Modern Life
        {
            testId: testIds[0],
            partNumber: 1,
            title: 'Interview - Personal Information and Technology',
            instructions: 'Answer questions about yourself and technology use',
            content: 'Part 1 focuses on familiar topics and personal experiences with technology',
        },
        {
            testId: testIds[0],
            partNumber: 2,
            title: 'Long Turn - Describe a Technological Device',
            instructions: 'Speak for 1-2 minutes about a technological device that has changed your life',
            content: 'You will have 1 minute to prepare and should speak for 1-2 minutes',
        },
        {
            testId: testIds[0],
            partNumber: 3,
            title: 'Discussion - Technology and Society',
            instructions: 'Discuss abstract ideas about technology\'s impact on society',
            content: 'Part 3 involves more complex discussion about technology and its effects',
        },
        // Test 2: Education and Learning
        {
            testId: testIds[1],
            partNumber: 1,
            title: 'Interview - Educational Background',
            instructions: 'Answer questions about your educational experiences',
            content: 'Part 1 covers personal experiences with education and learning',
        },
        {
            testId: testIds[1],
            partNumber: 2,
            title: 'Long Turn - Describe a Learning Experience',
            instructions: 'Speak for 1-2 minutes about a memorable learning experience',
            content: 'Describe when you learned something new and how it affected you',
        },
        {
            testId: testIds[1],
            partNumber: 3,
            title: 'Discussion - Education Systems and Methods',
            instructions: 'Discuss different approaches to education and learning',
            content: 'Explore abstract concepts about education systems and teaching methods',
        },
        // Test 3: Travel and Culture
        {
            testId: testIds[2],
            partNumber: 1,
            title: 'Interview - Travel and Holidays',
            instructions: 'Answer questions about your travel experiences and preferences',
            content: 'Discuss personal travel experiences and holiday preferences',
        },
        {
            testId: testIds[2],
            partNumber: 2,
            title: 'Long Turn - Describe a Cultural Experience',
            instructions: 'Speak for 1-2 minutes about a cultural experience or tradition',
            content: 'Describe a cultural event, tradition, or experience from your country or elsewhere',
        },
        {
            testId: testIds[2],
            partNumber: 3,
            title: 'Discussion - Cultural Differences and Globalization',
            instructions: 'Discuss how cultures interact in the modern world',
            content: 'Explore topics related to cultural exchange and globalization',
        },
        // Test 4: Environment and Nature
        {
            testId: testIds[3],
            partNumber: 1,
            title: 'Interview - Environment and Daily Life',
            instructions: 'Answer questions about environmental issues and your daily habits',
            content: 'Discuss personal experiences with environmental issues and nature',
        },
        {
            testId: testIds[3],
            partNumber: 2,
            title: 'Long Turn - Describe an Environmental Problem',
            instructions: 'Speak for 1-2 minutes about an environmental issue in your area',
            content: 'Describe an environmental problem and its effects on your community',
        },
        {
            testId: testIds[3],
            partNumber: 3,
            title: 'Discussion - Environmental Solutions and Future',
            instructions: 'Discuss solutions to environmental problems and future challenges',
            content: 'Explore complex environmental issues and potential solutions',
        },
        // Test 5: Work and Career
        {
            testId: testIds[4],
            partNumber: 1,
            title: 'Interview - Work and Career Plans',
            instructions: 'Answer questions about your work experience and career goals',
            content: 'Discuss personal work experiences and future career aspirations',
        },
        {
            testId: testIds[4],
            partNumber: 2,
            title: 'Long Turn - Describe Your Ideal Job',
            instructions: 'Speak for 1-2 minutes about your ideal job or career',
            content: 'Describe what kind of work you would like to do and why',
        },
        {
            testId: testIds[4],
            partNumber: 3,
            title: 'Discussion - Work-Life Balance and Career Development',
            instructions: 'Discuss modern work trends and career development',
            content: 'Explore abstract concepts about work, careers, and professional development',
        }
    ]).returning();

    // Group parts by test for easier question assignment
    const partsByTest = [
        insertedParts.slice(0, 3),   // Test 1 parts
        insertedParts.slice(3, 6),   // Test 2 parts
        insertedParts.slice(6, 9),   // Test 3 parts
        insertedParts.slice(9, 12),  // Test 4 parts
        insertedParts.slice(12, 15)  // Test 5 parts
    ];

    // Insert questions for all parts
    await db.insert(questions).values([
        // Test 1: Technology and Modern Life - Part 1
        {
            partId: partsByTest[0][0].id,
            questionNumber: 1,
            questionText: 'What kind of technology do you use most often?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[0][0].id,
            questionNumber: 2,
            questionText: 'How has technology changed the way you communicate with others?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[0][0].id,
            questionNumber: 3,
            questionText: 'Do you think children today spend too much time on electronic devices?',
            questionType: 'open',
            marks: 1,
        },
        // Test 1: Technology and Modern Life - Part 2
        {
            partId: partsByTest[0][1].id,
            questionNumber: 1,
            questionText: 'Describe a piece of technology that has made your life easier. You should say: what it is, how you use it, when you first started using it, and explain how it has made your life easier.',
            questionType: 'long_turn',
            marks: 3,
        },
        // Test 1: Technology and Modern Life - Part 3
        {
            partId: partsByTest[0][2].id,
            questionNumber: 1,
            questionText: 'What impact has technology had on the way people work?',
            questionType: 'discussion',
            marks: 1,
        },
        {
            partId: partsByTest[0][2].id,
            questionNumber: 2,
            questionText: 'Do you think artificial intelligence will replace human workers in the future?',
            questionType: 'discussion',
            marks: 2,
        },

        // Test 2: Education and Learning - Part 1
        {
            partId: partsByTest[1][0].id,
            questionNumber: 1,
            questionText: 'What subjects did you enjoy most at school?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[1][0].id,
            questionNumber: 2,
            questionText: 'How do you prefer to learn new things?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[1][0].id,
            questionNumber: 3,
            questionText: 'Do you think online learning is as effective as classroom learning?',
            questionType: 'open',
            marks: 1,
        },
        // Test 2: Education and Learning - Part 2
        {
            partId: partsByTest[1][1].id,
            questionNumber: 1,
            questionText: 'Describe a skill you learned that was difficult at first. You should say: what the skill was, how you learned it, why it was difficult, and explain how you feel about this skill now.',
            questionType: 'long_turn',
            marks: 3,
        },
        // Test 2: Education and Learning - Part 3
        {
            partId: partsByTest[1][2].id,
            questionNumber: 1,
            questionText: 'What are the advantages and disadvantages of studying abroad?',
            questionType: 'discussion',
            marks: 1,
        },
        {
            partId: partsByTest[1][2].id,
            questionNumber: 2,
            questionText: 'How do you think education systems should adapt to prepare students for future careers?',
            questionType: 'discussion',
            marks: 2,
        },

        // Test 3: Travel and Culture - Part 1
        {
            partId: partsByTest[2][0].id,
            questionNumber: 1,
            questionText: 'Do you like to travel? Why or why not?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[2][0].id,
            questionNumber: 2,
            questionText: 'What was the last place you visited as a tourist?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[2][0].id,
            questionNumber: 3,
            questionText: 'How do you usually plan your holidays?',
            questionType: 'open',
            marks: 1,
        },
        // Test 3: Travel and Culture - Part 2
        {
            partId: partsByTest[2][1].id,
            questionNumber: 1,
            questionText: 'Describe a festival or cultural event in your country. You should say: what it is, when it takes place, how people celebrate it, and explain why this event is important to your culture.',
            questionType: 'long_turn',
            marks: 3,
        },
        // Test 3: Travel and Culture - Part 3
        {
            partId: partsByTest[2][2].id,
            questionNumber: 1,
            questionText: 'How has tourism affected your country?',
            questionType: 'discussion',
            marks: 1,
        },
        {
            partId: partsByTest[2][2].id,
            questionNumber: 2,
            questionText: 'Do you think it\'s important to preserve traditional cultures in a globalized world?',
            questionType: 'discussion',
            marks: 2,
        },

        // Test 4: Environment and Nature - Part 1
        {
            partId: partsByTest[3][0].id,
            questionNumber: 1,
            questionText: 'Are you concerned about environmental problems?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[3][0].id,
            questionNumber: 2,
            questionText: 'What do you do to protect the environment?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[3][0].id,
            questionNumber: 3,
            questionText: 'Do you prefer to spend time in natural environments or cities?',
            questionType: 'open',
            marks: 1,
        },
        // Test 4: Environment and Nature - Part 2
        {
            partId: partsByTest[3][1].id,
            questionNumber: 1,
            questionText: 'Describe an environmental problem in your area. You should say: what the problem is, what causes it, how it affects people, and explain what could be done to solve it.',
            questionType: 'long_turn',
            marks: 3,
        },
        // Test 4: Environment and Nature - Part 3
        {
            partId: partsByTest[3][2].id,
            questionNumber: 1,
            questionText: 'What role should governments play in protecting the environment?',
            questionType: 'discussion',
            marks: 1,
        },
        {
            partId: partsByTest[3][2].id,
            questionNumber: 2,
            questionText: 'How can we balance economic development with environmental protection?',
            questionType: 'discussion',
            marks: 2,
        },

        // Test 5: Work and Career - Part 1
        {
            partId: partsByTest[4][0].id,
            questionNumber: 1,
            questionText: 'What kind of work do you do or want to do?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[4][0].id,
            questionNumber: 2,
            questionText: 'What qualities do you think are important for success at work?',
            questionType: 'open',
            marks: 1,
        },
        {
            partId: partsByTest[4][0].id,
            questionNumber: 3,
            questionText: 'Do you prefer to work independently or as part of a team?',
            questionType: 'open',
            marks: 1,
        },
        // Test 5: Work and Career - Part 2
        {
            partId: partsByTest[4][1].id,
            questionNumber: 1,
            questionText: 'Describe your ideal job. You should say: what kind of work it would be, what qualifications or skills would be needed, what the working conditions would be like, and explain why this would be your ideal job.',
            questionType: 'long_turn',
            marks: 3,
        },
        // Test 5: Work and Career - Part 3
        {
            partId: partsByTest[4][2].id,
            questionNumber: 1,
            questionText: 'How important is work-life balance in modern society?',
            questionType: 'discussion',
            marks: 1,
        },
        {
            partId: partsByTest[4][2].id,
            questionNumber: 2,
            questionText: 'What changes do you think will occur in the job market over the next 20 years?',
            questionType: 'discussion',
            marks: 2,
        }
    ]);

    console.log('✅ IELTS Speaking Tests seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});