import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';

async function main() {
    // Insert 5 IELTS Speaking Tests
    const sampleTests = [
        {
            title: 'IELTS Speaking Test 1: Technology and Modern Life',
            description: 'Comprehensive IELTS Speaking test covering technology, digital communication, and their impact on modern society',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 2: Education and Learning',
            description: 'IELTS Speaking test focusing on educational experiences, learning methods, and academic systems',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 3: Travel and Culture',
            description: 'IELTS Speaking test exploring travel experiences, cultural diversity, and global connections',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 4: Environment and Nature',
            description: 'IELTS Speaking test addressing environmental concerns, nature conservation, and sustainable living',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 5: Work and Career',
            description: 'IELTS Speaking test covering career aspirations, work experiences, and employment trends',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-01-19').toISOString(),
        }
    ];

    await db.insert(tests).values(sampleTests);

    // Test Parts for all 5 tests
    const sampleTestParts = [
        // Test 1: Technology and Modern Life
        {
            testId: 1,
            partNumber: 1,
            title: 'Part 1: Introduction and Interview (4-5 minutes)',
            instructions: 'The examiner will ask you general questions about yourself and familiar topics like technology use, social media, and communication preferences.',
            content: 'Personal questions about technology use, social media habits, and digital communication in daily life.'
        },
        {
            testId: 1,
            partNumber: 2,
            title: 'Part 2: Individual Long Turn (3-4 minutes)',
            instructions: 'You will be given a cue card with a topic. You have 1 minute to prepare and should speak for 1-2 minutes. The examiner may ask 1-2 follow-up questions.',
            content: 'Describe a piece of technology that has made your life easier. You should say: what it is, how you use it, when you started using it, and explain why it has made your life easier.'
        },
        {
            testId: 1,
            partNumber: 3,
            title: 'Part 3: Two-way Discussion (4-5 minutes)',
            instructions: 'The examiner will ask you more abstract questions related to the topic in Part 2, focusing on broader issues about technology and society.',
            content: 'Discussion about technology\'s impact on society, digital divide, future technological developments, and their effects on human relationships.'
        },

        // Test 2: Education and Learning
        {
            testId: 2,
            partNumber: 1,
            title: 'Part 1: Introduction and Interview (4-5 minutes)',
            instructions: 'The examiner will ask you general questions about yourself and familiar topics like your studies, learning preferences, and school experiences.',
            content: 'Personal questions about educational background, study habits, favorite subjects, and learning methods.'
        },
        {
            testId: 2,
            partNumber: 2,
            title: 'Part 2: Individual Long Turn (3-4 minutes)',
            instructions: 'You will be given a cue card with a topic. You have 1 minute to prepare and should speak for 1-2 minutes. The examiner may ask 1-2 follow-up questions.',
            content: 'Describe a memorable learning experience you had. You should say: what you learned, where and when it happened, who taught you, and explain why this experience was memorable for you.'
        },
        {
            testId: 2,
            partNumber: 3,
            title: 'Part 3: Two-way Discussion (4-5 minutes)',
            instructions: 'The examiner will ask you more abstract questions related to the topic in Part 2, focusing on broader issues about education systems and learning.',
            content: 'Discussion about different education systems, online vs traditional learning, the role of teachers, and future of education.'
        },

        // Test 3: Travel and Culture
        {
            testId: 3,
            partNumber: 1,
            title: 'Part 1: Introduction and Interview (4-5 minutes)',
            instructions: 'The examiner will ask you general questions about yourself and familiar topics like travel experiences, cultural interests, and places you know.',
            content: 'Personal questions about travel experiences, favorite destinations, cultural activities, and local traditions.'
        },
        {
            testId: 3,
            partNumber: 2,
            title: 'Part 2: Individual Long Turn (3-4 minutes)',
            instructions: 'You will be given a cue card with a topic. You have 1 minute to prepare and should speak for 1-2 minutes. The examiner may ask 1-2 follow-up questions.',
            content: 'Describe a place you visited that was very different from your home country. You should say: where it was, when you went there, what was different about it, and explain how you felt about these differences.'
        },
        {
            testId: 3,
            partNumber: 3,
            title: 'Part 3: Two-way Discussion (4-5 minutes)',
            instructions: 'The examiner will ask you more abstract questions related to the topic in Part 2, focusing on broader issues about tourism, cultural exchange, and globalization.',
            content: 'Discussion about the benefits and drawbacks of tourism, cultural preservation vs modernization, and the impact of globalization on local cultures.'
        },

        // Test 4: Environment and Nature
        {
            testId: 4,
            partNumber: 1,
            title: 'Part 1: Introduction and Interview (4-5 minutes)',
            instructions: 'The examiner will ask you general questions about yourself and familiar topics like your relationship with nature, environmental habits, and outdoor activities.',
            content: 'Personal questions about environmental awareness, outdoor activities, nature preferences, and eco-friendly habits.'
        },
        {
            testId: 4,
            partNumber: 2,
            title: 'Part 2: Individual Long Turn (3-4 minutes)',
            instructions: 'You will be given a cue card with a topic. You have 1 minute to prepare and should speak for 1-2 minutes. The examiner may ask 1-2 follow-up questions.',
            content: 'Describe a natural place that you find beautiful or interesting. You should say: where it is, what you can see there, what people do there, and explain why you find this place beautiful or interesting.'
        },
        {
            testId: 4,
            partNumber: 3,
            title: 'Part 3: Two-way Discussion (4-5 minutes)',
            instructions: 'The examiner will ask you more abstract questions related to the topic in Part 2, focusing on broader issues about environmental protection and climate change.',
            content: 'Discussion about environmental challenges, individual vs government responsibility, sustainable development, and the future of our planet.'
        },

        // Test 5: Work and Career
        {
            testId: 5,
            partNumber: 1,
            title: 'Part 1: Introduction and Interview (4-5 minutes)',
            instructions: 'The examiner will ask you general questions about yourself and familiar topics like your work, career goals, and job preferences.',
            content: 'Personal questions about current work or studies, career aspirations, ideal job characteristics, and work-life balance.'
        },
        {
            testId: 5,
            partNumber: 2,
            title: 'Part 2: Individual Long Turn (3-4 minutes)',
            instructions: 'You will be given a cue card with a topic. You have 1 minute to prepare and should speak for 1-2 minutes. The examiner may ask 1-2 follow-up questions.',
            content: 'Describe a job you would like to do in the future. You should say: what the job is, what skills you would need, how you could get this job, and explain why you would like to do this job.'
        },
        {
            testId: 5,
            partNumber: 3,
            title: 'Part 3: Two-way Discussion (4-5 minutes)',
            instructions: 'The examiner will ask you more abstract questions related to the topic in Part 2, focusing on broader issues about employment trends and the changing nature of work.',
            content: 'Discussion about changing job markets, remote work trends, work-life balance importance, and the future of employment.'
        }
    ];

    await db.insert(testParts).values(sampleTestParts);

    // Questions for all test parts
    const sampleQuestions = [
        // Test 1 Part 1 Questions
        {
            partId: 1,
            questionNumber: 1,
            questionText: 'Do you use social media regularly? Which platforms do you prefer and why?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 1,
            questionNumber: 2,
            questionText: 'How has technology changed the way you communicate with friends and family?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 1,
            questionNumber: 3,
            questionText: 'What electronic device could you not live without? Why is it so important to you?',
            questionType: 'speaking_question',
            marks: 1,
        },

        // Test 1 Part 2 Questions
        {
            partId: 2,
            questionNumber: 1,
            questionText: 'Describe a piece of technology that has made your life easier. You should say: what it is, how you use it, when you started using it, and explain why it has made your life easier.',
            questionType: 'speaking_question',
            marks: 3,
        },

        // Test 1 Part 3 Questions
        {
            partId: 3,
            questionNumber: 1,
            questionText: 'Do you think people today are too dependent on technology? Why or why not?',
            questionType: 'speaking_question',
            marks: 2,
        },
        {
            partId: 3,
            questionNumber: 2,
            questionText: 'How might artificial intelligence change the job market in the future?',
            questionType: 'speaking_question',
            marks: 2,
        },

        // Test 2 Part 1 Questions
        {
            partId: 4,
            questionNumber: 1,
            questionText: 'What subjects did you enjoy most at school? What made them interesting for you?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 4,
            questionNumber: 2,
            questionText: 'Do you prefer studying alone or in groups? What are the advantages of your preferred method?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 4,
            questionNumber: 3,
            questionText: 'How do you usually prepare for exams or important tests?',
            questionType: 'speaking_question',
            marks: 1,
        },

        // Test 2 Part 2 Questions
        {
            partId: 5,
            questionNumber: 1,
            questionText: 'Describe a memorable learning experience you had. You should say: what you learned, where and when it happened, who taught you, and explain why this experience was memorable for you.',
            questionType: 'speaking_question',
            marks: 3,
        },

        // Test 2 Part 3 Questions
        {
            partId: 6,
            questionNumber: 1,
            questionText: 'What are the advantages and disadvantages of online learning compared to traditional classroom education?',
            questionType: 'speaking_question',
            marks: 2,
        },
        {
            partId: 6,
            questionNumber: 2,
            questionText: 'How important is it for education systems to adapt to modern technology and changing job markets?',
            questionType: 'speaking_question',
            marks: 2,
        },

        // Test 3 Part 1 Questions
        {
            partId: 7,
            questionNumber: 1,
            questionText: 'Do you enjoy traveling? What type of places do you like to visit?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 7,
            questionNumber: 2,
            questionText: 'Have you ever experienced culture shock when visiting a different country or region?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 7,
            questionNumber: 3,
            questionText: 'What aspects of your own culture are you most proud of?',
            questionType: 'speaking_question',
            marks: 1,
        },

        // Test 3 Part 2 Questions
        {
            partId: 8,
            questionNumber: 1,
            questionText: 'Describe a place you visited that was very different from your home country. You should say: where it was, when you went there, what was different about it, and explain how you felt about these differences.',
            questionType: 'speaking_question',
            marks: 3,
        },

        // Test 3 Part 3 Questions
        {
            partId: 9,
            questionNumber: 1,
            questionText: 'What impact does mass tourism have on local communities and their traditional ways of life?',
            questionType: 'speaking_question',
            marks: 2,
        },
        {
            partId: 9,
            questionNumber: 2,
            questionText: 'How can countries balance the economic benefits of tourism with the need to preserve their cultural heritage?',
            questionType: 'speaking_question',
            marks: 2,
        },

        // Test 4 Part 1 Questions
        {
            partId: 10,
            questionNumber: 1,
            questionText: 'Do you prefer spending time in natural environments or urban areas? Why?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 10,
            questionNumber: 2,
            questionText: 'What do you do to protect the environment in your daily life?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 10,
            questionNumber: 3,
            questionText: 'Have you noticed any changes in the climate or environment in your area over the years?',
            questionType: 'speaking_question',
            marks: 1,
        },

        // Test 4 Part 2 Questions
        {
            partId: 11,
            questionNumber: 1,
            questionText: 'Describe a natural place that you find beautiful or interesting. You should say: where it is, what you can see there, what people do there, and explain why you find this place beautiful or interesting.',
            questionType: 'speaking_question',
            marks: 3,
        },

        // Test 4 Part 3 Questions
        {
            partId: 12,
            questionNumber: 1,
            questionText: 'Who should take more responsibility for environmental protection - individuals or governments? Why?',
            questionType: 'speaking_question',
            marks: 2,
        },
        {
            partId: 12,
            questionNumber: 2,
            questionText: 'What role can technology play in solving environmental problems and fighting climate change?',
            questionType: 'speaking_question',
            marks: 2,
        },

        // Test 5 Part 1 Questions
        {
            partId: 13,
            questionNumber: 1,
            questionText: 'Are you currently working or studying? What do you enjoy most about it?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 13,
            questionNumber: 2,
            questionText: 'What qualities do you think are important for success in the workplace?',
            questionType: 'speaking_question',
            marks: 1,
        },
        {
            partId: 13,
            questionNumber: 3,
            questionText: 'How important is work-life balance to you? How do you achieve it?',
            questionType: 'speaking_question',
            marks: 1,
        },

        // Test 5 Part 2 Questions
        {
            partId: 14,
            questionNumber: 1,
            questionText: 'Describe a job you would like to do in the future. You should say: what the job is, what skills you would need, how you could get this job, and explain why you would like to do this job.',
            questionType: 'speaking_question',
            marks: 3,
        },

        // Test 5 Part 3 Questions
        {
            partId: 15,
            questionNumber: 1,
            questionText: 'How has the nature of work changed in recent years, and what further changes do you expect?',
            questionType: 'speaking_question',
            marks: 2,
        },
        {
            partId: 15,
            questionNumber: 2,
            questionText: 'What are the advantages and disadvantages of remote work for both employees and employers?',
            questionType: 'speaking_question',
            marks: 2,
        }
    ];

    await db.insert(questions).values(sampleQuestions);

    console.log('✅ IELTS Speaking Tests seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});