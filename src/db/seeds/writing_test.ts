import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';

async function main() {
    // Create the IELTS Writing Test
    const testData = {
        title: 'IELTS Writing Test - Academic Module',
        description: 'Complete IELTS Academic Writing test with Task 1 and Task 2',
        type: 'writing',
        duration: 60,
        totalMarks: 9,
        createdAt: new Date('2024-01-20').toISOString(),
    };

    const [insertedTest] = await db.insert(tests).values(testData).returning();
    const testId = insertedTest.id;

    // Create Part 1 - Writing Task 1
    const part1Data = {
        testId: testId,
        partNumber: 1,
        title: 'Task 1 - Data Analysis',
        instructions: 'Write at least 150 words. You should spend about 20 minutes on this task.',
        content: 'You should spend about 20 minutes on this task. The chart below shows data about household accommodation. You should write at least 150 words.',
        audioUrl: null,
    };

    const [insertedPart1] = await db.insert(testParts).values(part1Data).returning();
    const part1Id = insertedPart1.id;

    // Create Part 2 - Writing Task 2
    const part2Data = {
        testId: testId,
        partNumber: 2,
        title: 'Task 2 - Essay Writing',
        instructions: 'Write at least 250 words. You should spend about 40 minutes on this task. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        content: 'You should spend about 40 minutes on this task. Write about the following topic. You should write at least 250 words.',
        audioUrl: null,
    };

    const [insertedPart2] = await db.insert(testParts).values(part2Data).returning();
    const part2Id = insertedPart2.id;

    // Create Question 1 for Part 1
    const question1Data = {
        partId: part1Id,
        questionNumber: 1,
        questionText: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        questionType: 'graph_description',
        options: null,
        correctAnswer: null,
        marks: 4,
    };

    // Create Question 2 for Part 2
    const question2Data = {
        partId: part2Id,
        questionNumber: 2,
        questionText: 'Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this. Discuss both these views and give your own opinion.',
        questionType: 'essay',
        options: null,
        correctAnswer: null,
        marks: 5,
    };

    await db.insert(questions).values([question1Data, question2Data]);

    console.log('✅ IELTS Writing Test seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});