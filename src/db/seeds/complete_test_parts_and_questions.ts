import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';

async function main() {
    // Query tests that have no associated testParts
    const testsWithoutParts = await db
        .select()
        .from(tests)
        .leftJoin(testParts, eq(tests.id, testParts.testId))
        .where(isNull(testParts.id));

    const uniqueTests = testsWithoutParts.reduce((acc, row) => {
        if (!acc.find(t => t.id === row.tests.id)) {
            acc.push(row.tests);
        }
        return acc;
    }, []);

    for (const test of uniqueTests) {
        if (test.type === 'listening') {
            await seedListeningTest(test.id);
        } else if (test.type === 'reading') {
            await seedReadingTest(test.id);
        } else if (test.type === 'writing') {
            await seedWritingTest(test.id);
        } else if (test.type === 'speaking') {
            await seedSpeakingTest(test.id);
        }
    }

    console.log('✅ Complete test parts and questions seeder completed successfully');
}

async function seedListeningTest(testId) {
    // Part 1: Social conversation with gap fill questions
    const part1 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 1,
        title: 'Social Conversation',
        instructions: 'You will hear a conversation between two people. Complete the notes below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
        content: 'A conversation about booking a hotel room for a vacation.',
        audioUrl: 'https://example.com/listening/part1.mp3',
        listeningScript: 'Woman: Hello, I\'d like to book a room for next weekend please.\nMan: Certainly. What dates were you thinking of?\nWoman: Friday the 15th to Sunday the 17th of March.\nMan: Let me check availability. Yes, we have rooms available. Would you prefer a single or double room?\nWoman: A double room please, with a sea view if possible.\nMan: Perfect. That would be £120 per night. The room includes breakfast and has a private bathroom with a shower.\nWoman: That sounds great. My name is Sarah Johnson.\nMan: Thank you Ms Johnson. Could I have a contact number?\nWoman: Yes, it\'s 07789 123456.\nMan: Excellent. I\'ll send you a confirmation email shortly.'
    }).returning({ id: testParts.id });

    const part1Questions = [
        { questionNumber: 1, questionText: 'Check-in date: Friday _____ March', questionType: 'gap_fill', correctAnswer: '15th', marks: 1 },
        { questionNumber: 2, questionText: 'Check-out date: _____ 17th March', questionType: 'gap_fill', correctAnswer: 'Sunday', marks: 1 },
        { questionNumber: 3, questionText: 'Room type: _____ room', questionType: 'gap_fill', correctAnswer: 'double', marks: 1 },
        { questionNumber: 4, questionText: 'Special request: room with _____', questionType: 'gap_fill', correctAnswer: 'sea view', marks: 1 },
        { questionNumber: 5, questionText: 'Price per night: £_____', questionType: 'gap_fill', correctAnswer: '120', marks: 1 },
        { questionNumber: 6, questionText: 'Breakfast is _____', questionType: 'gap_fill', correctAnswer: 'included', marks: 1 },
        { questionNumber: 7, questionText: 'Bathroom has a _____', questionType: 'gap_fill', correctAnswer: 'shower', marks: 1 },
        { questionNumber: 8, questionText: 'Customer\'s surname: _____', questionType: 'gap_fill', correctAnswer: 'Johnson', marks: 1 },
        { questionNumber: 9, questionText: 'Phone number: _____', questionType: 'gap_fill', correctAnswer: '07789 123456', marks: 1 },
        { questionNumber: 10, questionText: 'Confirmation will be sent by _____', questionType: 'gap_fill', correctAnswer: 'email', marks: 1 }
    ];

    for (const question of part1Questions) {
        await db.insert(questions).values({
            partId: part1[0].id,
            ...question
        });
    }

    // Part 2: Monologue with multiple choice questions
    const part2 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 2,
        title: 'Information Talk',
        instructions: 'You will hear a talk about a local museum. Choose the correct letter A, B or C.',
        content: 'A museum guide giving information about the Natural History Museum.',
        audioUrl: 'https://example.com/listening/part2.mp3',
        listeningScript: 'Welcome to the Natural History Museum. I\'m David, and I\'ll be your guide today. The museum was founded in 1881 and houses over 70 million specimens. Our most popular exhibition is the Dinosaur Gallery, which features life-sized models and interactive displays. The museum is open from 10 AM to 6 PM daily, except Mondays when we\'re closed for maintenance. Adult tickets cost £15, while children under 16 enter free with a paying adult. Our café on the second floor serves fresh sandwiches and hot drinks. The gift shop near the entrance sells books, toys, and educational materials. Don\'t miss our special exhibition on Ancient Egypt, running until the end of next month. Free guided tours start every hour from the information desk.'
    }).returning({ id: testParts.id });

    const part2Questions = [
        { questionNumber: 11, questionText: 'The museum was founded in', questionType: 'multiple_choice', options: ['1871', '1881', '1891'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 12, questionText: 'The museum houses over', questionType: 'multiple_choice', options: ['60 million specimens', '70 million specimens', '80 million specimens'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 13, questionText: 'The most popular exhibition is', questionType: 'multiple_choice', options: ['Ancient Egypt', 'Dinosaur Gallery', 'Natural Wonders'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 14, questionText: 'The museum is closed on', questionType: 'multiple_choice', options: ['Sundays', 'Mondays', 'Tuesdays'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 15, questionText: 'Adult ticket price is', questionType: 'multiple_choice', options: ['£12', '£15', '£18'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 16, questionText: 'Children under 16', questionType: 'multiple_choice', options: ['pay half price', 'enter free with adult', 'need student ID'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 17, questionText: 'The café is located on the', questionType: 'multiple_choice', options: ['first floor', 'second floor', 'ground floor'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 18, questionText: 'The gift shop is near the', questionType: 'multiple_choice', options: ['café', 'entrance', 'exit'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 19, questionText: 'The Ancient Egypt exhibition runs until', questionType: 'multiple_choice', options: ['next week', 'end of this month', 'end of next month'], correctAnswer: 'C', marks: 1 },
        { questionNumber: 20, questionText: 'Guided tours start every', questionType: 'multiple_choice', options: ['30 minutes', 'hour', '2 hours'], correctAnswer: 'B', marks: 1 }
    ];

    for (const question of part2Questions) {
        await db.insert(questions).values({
            partId: part2[0].id,
            ...question
        });
    }

    // Part 3: Academic discussion with matching questions
    const part3 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 3,
        title: 'Academic Discussion',
        instructions: 'You will hear a discussion between a professor and two students about renewable energy. Match each statement with the correct person A, B or C.',
        content: 'A discussion about different types of renewable energy sources.',
        audioUrl: 'https://example.com/listening/part3.mp3',
        listeningScript: 'Professor: Today we\'re discussing renewable energy. Sarah, what do you think about solar power?\nSarah: I believe solar energy is the most promising because it\'s abundant and becoming more affordable. The technology has improved dramatically.\nTom: I disagree. Wind power is more reliable in many regions. Solar panels don\'t work at night or during cloudy weather.\nProfessor: Both valid points. What about hydroelectric power?\nSarah: It\'s effective but can damage ecosystems when dams are built.\nTom: True, but it provides consistent energy output unlike solar and wind.\nProfessor: Interesting perspectives. How do you see the future of renewable energy?\nSarah: I think we need a combination of all sources, with smart grids to manage distribution.\nTom: Government investment in research is crucial for breakthrough technologies.'
    }).returning({ id: testParts.id });

    const part3Questions = [
        { questionNumber: 21, questionText: 'Solar energy is most promising', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 22, questionText: 'Wind power is more reliable', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'C', marks: 1 },
        { questionNumber: 23, questionText: 'Solar panels don\'t work at night', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'C', marks: 1 },
        { questionNumber: 24, questionText: 'Hydroelectric power can damage ecosystems', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 25, questionText: 'Hydroelectric provides consistent output', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'C', marks: 1 },
        { questionNumber: 26, questionText: 'Need combination of all sources', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 27, questionText: 'Smart grids manage distribution', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 28, questionText: 'Government investment is crucial', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'C', marks: 1 },
        { questionNumber: 29, questionText: 'Technology has improved dramatically', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 30, questionText: 'Research needs breakthrough technologies', questionType: 'matching', options: ['Professor', 'Sarah', 'Tom'], correctAnswer: 'C', marks: 1 }
    ];

    for (const question of part3Questions) {
        await db.insert(questions).values({
            partId: part3[0].id,
            ...question
        });
    }

    // Part 4: Academic lecture with completion questions
    const part4 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 4,
        title: 'Academic Lecture',
        instructions: 'You will hear a lecture about climate change. Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.',
        content: 'A university lecture on the causes and effects of climate change.',
        audioUrl: 'https://example.com/listening/part4.mp3',
        listeningScript: 'Today\'s lecture focuses on climate change, one of the most pressing issues of our time. The primary cause is the increase in greenhouse gases, particularly carbon dioxide from burning fossil fuels. The average global temperature has risen by 1.1 degrees Celsius since pre-industrial times. This warming has led to melting ice caps, rising sea levels, and more frequent extreme weather events. Scientists use computer models to predict future climate scenarios. The most optimistic projections show a 1.5 degree increase, while pessimistic models predict up to 4 degrees warming by 2100. Immediate action is required, including transitioning to renewable energy sources, improving energy efficiency, and implementing carbon pricing policies. Individual actions like reducing energy consumption and choosing sustainable transport also contribute to mitigation efforts.'
    }).returning({ id: testParts.id });

    const part4Questions = [
        { questionNumber: 31, questionText: 'Primary cause: increase in _____ gases', questionType: 'completion', correctAnswer: 'greenhouse', marks: 1 },
        { questionNumber: 32, questionText: 'Main greenhouse gas: _____ dioxide', questionType: 'completion', correctAnswer: 'carbon', marks: 1 },
        { questionNumber: 33, questionText: 'CO2 comes from burning _____ fuels', questionType: 'completion', correctAnswer: 'fossil', marks: 1 },
        { questionNumber: 34, questionText: 'Temperature rise: _____ degrees Celsius', questionType: 'completion', correctAnswer: '1.1', marks: 1 },
        { questionNumber: 35, questionText: 'Effects include melting _____ caps', questionType: 'completion', correctAnswer: 'ice', marks: 1 },
        { questionNumber: 36, questionText: 'Also causes rising _____ levels', questionType: 'completion', correctAnswer: 'sea', marks: 1 },
        { questionNumber: 37, questionText: 'Scientists use _____ models', questionType: 'completion', correctAnswer: 'computer', marks: 1 },
        { questionNumber: 38, questionText: 'Optimistic prediction: _____ degree increase', questionType: 'completion', correctAnswer: '1.5', marks: 1 },
        { questionNumber: 39, questionText: 'Solution: transition to _____ energy', questionType: 'completion', correctAnswer: 'renewable', marks: 1 },
        { questionNumber: 40, questionText: 'Also need _____ pricing policies', questionType: 'completion', correctAnswer: 'carbon', marks: 1 }
    ];

    for (const question of part4Questions) {
        await db.insert(questions).values({
            partId: part4[0].id,
            ...question
        });
    }
}

async function seedReadingTest(testId) {
    // Reading Passage 1
    const passage1 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 1,
        title: 'The Impact of Social Media on Communication',
        instructions: 'Read the passage and answer questions 1-13.',
        content: 'Social media has fundamentally transformed the way humans communicate, creating unprecedented opportunities for connection while simultaneously raising concerns about the quality and authenticity of modern interactions. The rise of platforms such as Facebook, Twitter, Instagram, and TikTok has enabled billions of people to share thoughts, experiences, and emotions instantaneously across vast geographical distances. This digital revolution has democratized communication, allowing individuals from diverse backgrounds to participate in global conversations that were previously limited to traditional media outlets and political elites.\n\nThe benefits of social media communication are numerous and significant. First, these platforms have eliminated traditional barriers to information sharing, enabling real-time updates during emergencies, natural disasters, and significant events. Social movements have leveraged these tools to organize protests, raise awareness, and mobilize supporters with remarkable efficiency. Additionally, social media has provided marginalized communities with powerful platforms to amplify their voices and share their experiences with broader audiences.\n\nHowever, critics argue that social media has contributed to a decline in meaningful face-to-face interactions and deep, sustained conversations. The emphasis on brief messages, visual content, and immediate responses has potentially reduced attention spans and the ability to engage in complex discussions. Furthermore, the phenomenon of \"echo chambers\" – where users primarily encounter information that confirms their existing beliefs – has raised concerns about polarization and the spread of misinformation.\n\nPsychological research suggests that excessive social media use can lead to anxiety, depression, and feelings of social isolation, particularly among young people. The constant comparison with carefully curated online personas can negatively impact self-esteem and mental health. Despite these challenges, social media remains an integral part of modern communication, and understanding how to use these tools effectively and responsibly is crucial for navigating the digital age.'
    }).returning({ id: testParts.id });

    const passage1Questions = [
        { questionNumber: 1, questionText: 'Social media has democratized communication.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 2, questionText: 'Traditional media outlets supported social media development.', questionType: 'true_false_not_given', correctAnswer: 'Not Given', marks: 1 },
        { questionNumber: 3, questionText: 'Social media eliminates barriers to information sharing.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 4, questionText: 'All social movements use social media effectively.', questionType: 'true_false_not_given', correctAnswer: 'Not Given', marks: 1 },
        { questionNumber: 5, questionText: 'Social media has reduced attention spans.', questionType: 'true_false_not_given', correctAnswer: 'Not Given', marks: 1 },
        { questionNumber: 6, questionText: 'Echo chambers contribute to polarization.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 7, questionText: 'Young people are most affected by social media\'s psychological impact.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 8, questionText: 'Social media platforms mentioned include', questionType: 'multiple_choice', options: ['Facebook and Twitter only', 'Facebook, Twitter, Instagram, and TikTok', 'Only visual platforms'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 9, questionText: 'The main benefit for marginalized communities is', questionType: 'multiple_choice', options: ['economic opportunities', 'amplifying their voices', 'technical skills'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 10, questionText: 'Echo chambers occur when users encounter information that _____ their beliefs.', questionType: 'gap_fill', correctAnswer: 'confirms', marks: 1 },
        { questionNumber: 11, questionText: 'Excessive social media use can lead to anxiety, depression, and _____.', questionType: 'gap_fill', correctAnswer: 'social isolation', marks: 1 },
        { questionNumber: 12, questionText: 'Online personas are described as carefully _____.', questionType: 'gap_fill', correctAnswer: 'curated', marks: 1 },
        { questionNumber: 13, questionText: 'Understanding effective social media use is crucial for navigating the _____ age.', questionType: 'gap_fill', correctAnswer: 'digital', marks: 1 }
    ];

    for (const question of passage1Questions) {
        await db.insert(questions).values({
            partId: passage1[0].id,
            ...question
        });
    }

    // Reading Passage 2
    const passage2 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 2,
        title: 'Sustainable Architecture and Green Building Design',
        instructions: 'Read the passage and answer questions 14-26.',
        content: 'Sustainable architecture represents a paradigm shift in building design, prioritizing environmental responsibility, energy efficiency, and occupant well-being. This approach to construction integrates renewable energy systems, sustainable materials, and innovative design principles to minimize environmental impact while maximizing functionality and aesthetic appeal. Green buildings typically consume 25-30% less energy than conventional structures and can reduce water usage by up to 40%, demonstrating the tangible benefits of sustainable design practices.\n\nThe core principles of sustainable architecture encompass several key areas. Material selection focuses on renewable, recycled, or locally sourced options that minimize transportation costs and environmental degradation. Energy systems incorporate solar panels, wind turbines, and geothermal heating to reduce dependence on fossil fuels. Water management includes rainwater harvesting, greywater recycling, and drought-resistant landscaping. Additionally, passive design strategies such as optimal building orientation, natural ventilation, and strategic window placement can significantly reduce energy consumption without requiring complex mechanical systems.\n\nInnovative technologies are revolutionizing sustainable building practices. Smart building systems use sensors and artificial intelligence to optimize energy usage, automatically adjusting lighting, heating, and cooling based on occupancy and environmental conditions. Green roofs and living walls not only provide insulation but also improve air quality, manage stormwater runoff, and create habitats for urban wildlife. Advanced insulation materials, including aerogel and vacuum-insulated panels, offer superior thermal performance while reducing building envelope thickness.\n\nDespite the numerous advantages, sustainable architecture faces significant challenges. Initial construction costs can be 5-15% higher than conventional buildings, deterring some developers and clients. The lack of standardized certification processes and varying regional regulations create complexity in project planning and approval. Additionally, the limited availability of skilled professionals trained in sustainable design techniques can slow adoption rates. However, long-term operational savings, improved indoor air quality, and increasing environmental awareness are driving greater acceptance of green building practices among architects, developers, and occupants worldwide.'
    }).returning({ id: testParts.id });

    const passage2Questions = [
        { questionNumber: 14, questionText: 'Green buildings consume _____ less energy than conventional structures.', questionType: 'gap_fill', correctAnswer: '25-30%', marks: 1 },
        { questionNumber: 15, questionText: 'Water usage can be reduced by up to _____.', questionType: 'gap_fill', correctAnswer: '40%', marks: 1 },
        { questionNumber: 16, questionText: 'Material selection focuses on renewable, recycled, or _____ sourced options.', questionType: 'gap_fill', correctAnswer: 'locally', marks: 1 },
        { questionNumber: 17, questionText: 'Energy systems mentioned include solar panels, wind turbines, and _____ heating.', questionType: 'gap_fill', correctAnswer: 'geothermal', marks: 1 },
        { questionNumber: 18, questionText: 'Water management includes rainwater harvesting and _____ recycling.', questionType: 'gap_fill', correctAnswer: 'greywater', marks: 1 },
        { questionNumber: 19, questionText: 'Smart building systems use sensors and _____ intelligence.', questionType: 'gap_fill', correctAnswer: 'artificial', marks: 1 },
        { questionNumber: 20, questionText: 'Advanced insulation materials include aerogel and _____ panels.', questionType: 'gap_fill', correctAnswer: 'vacuum-insulated', marks: 1 },
        { questionNumber: 21, questionText: 'Initial construction costs can be _____ higher than conventional buildings.', questionType: 'gap_fill', correctAnswer: '5-15%', marks: 1 },
        { questionNumber: 22, questionText: 'Sustainable architecture prioritizes environmental responsibility.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 23, questionText: 'All regions have standardized certification processes.', questionType: 'true_false_not_given', correctAnswer: 'False', marks: 1 },
        { questionNumber: 24, questionText: 'Green roofs provide insulation and improve air quality.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 25, questionText: 'Most architects are trained in sustainable design techniques.', questionType: 'true_false_not_given', correctAnswer: 'False', marks: 1 },
        { questionNumber: 26, questionText: 'Long-term operational savings are driving greater acceptance.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 }
    ];

    for (const question of passage2Questions) {
        await db.insert(questions).values({
            partId: passage2[0].id,
            ...question
        });
    }

    // Reading Passage 3
    const passage3 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 3,
        title: 'The Evolution of Artificial Intelligence in Healthcare',
        instructions: 'Read the passage and answer questions 27-40.',
        content: 'Artificial intelligence is transforming healthcare delivery, offering unprecedented opportunities to improve patient outcomes, reduce costs, and enhance diagnostic accuracy. Machine learning algorithms can analyze vast datasets of medical images, patient records, and clinical research to identify patterns that might escape human observation. This technological revolution is particularly evident in radiology, where AI systems can detect early-stage cancers, predict treatment responses, and prioritize urgent cases with remarkable precision.\n\nThe applications of AI in healthcare are diverse and expanding rapidly. Diagnostic imaging benefits from deep learning models that can identify subtle abnormalities in X-rays, MRIs, and CT scans with accuracy rates often exceeding those of experienced radiologists. Drug discovery processes, traditionally taking 10-15 years and costing billions of dollars, are being accelerated through AI-powered molecular modeling and predictive analytics. Personalized medicine utilizes genetic data and patient history to tailor treatments to individual needs, optimizing therapeutic effectiveness while minimizing adverse reactions.\n\nRobotic surgery represents another frontier where AI integration is yielding significant benefits. Surgical robots equipped with AI guidance systems can perform complex procedures with enhanced precision, reduced invasiveness, and faster recovery times. These systems provide surgeons with real-time feedback, 3D visualization, and tremor reduction capabilities that improve surgical outcomes. Additionally, AI-powered monitoring systems in intensive care units can predict patient deterioration hours before traditional warning signs appear, enabling proactive interventions that save lives.\n\nHowever, the integration of AI in healthcare faces substantial challenges that must be addressed before widespread adoption can occur. Data privacy concerns are paramount, as medical AI systems require access to sensitive patient information for training and operation. Regulatory approval processes for AI medical devices are complex and time-consuming, often lagging behind the rapid pace of technological development. The potential for algorithmic bias, particularly affecting underrepresented populations, raises ethical questions about fairness and equity in healthcare delivery. Furthermore, the high costs of implementation and the need for specialized technical expertise create barriers for smaller healthcare providers.\n\nDespite these challenges, the future of AI in healthcare appears promising. Collaborative efforts between technology companies, healthcare institutions, and regulatory bodies are establishing frameworks for safe and effective AI deployment. As these systems become more sophisticated and accessible, they have the potential to democratize high-quality healthcare, bringing advanced diagnostic and treatment capabilities to underserved communities worldwide.'
    }).returning({ id: testParts.id });

    const passage3Questions = [
        { questionNumber: 27, questionText: 'AI can analyze medical images, patient records, and _____ research.', questionType: 'gap_fill', correctAnswer: 'clinical', marks: 1 },
        { questionNumber: 28, questionText: 'Drug discovery traditionally takes _____ years.', questionType: 'gap_fill', correctAnswer: '10-15', marks: 1 },
        { questionNumber: 29, questionText: 'Personalized medicine utilizes genetic data and patient _____.', questionType: 'gap_fill', correctAnswer: 'history', marks: 1 },
        { questionNumber: 30, questionText: 'Surgical robots provide surgeons with real-time feedback and _____ visualization.', questionType: 'gap_fill', correctAnswer: '3D', marks: 1 },
        { questionNumber: 31, questionText: 'AI monitoring systems can predict patient deterioration _____ before warning signs.', questionType: 'gap_fill', correctAnswer: 'hours', marks: 1 },
        { questionNumber: 32, questionText: 'The main advantage of AI in radiology is', questionType: 'multiple_choice', options: ['cost reduction', 'detecting early-stage cancers', 'faster processing'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 33, questionText: 'Deep learning models in imaging can achieve accuracy rates', questionType: 'multiple_choice', options: ['similar to radiologists', 'exceeding radiologists', 'below radiologists'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 34, questionText: 'The biggest challenge for AI healthcare implementation is', questionType: 'multiple_choice', options: ['technical complexity', 'data privacy concerns', 'cost considerations'], correctAnswer: 'B', marks: 1 },
        { questionNumber: 35, questionText: 'AI systems can identify patterns that escape human observation.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 36, questionText: 'All hospitals have implemented AI monitoring systems.', questionType: 'true_false_not_given', correctAnswer: 'False', marks: 1 },
        { questionNumber: 37, questionText: 'Regulatory approval processes are keeping pace with technology.', questionType: 'true_false_not_given', correctAnswer: 'False', marks: 1 },
        { questionNumber: 38, questionText: 'Algorithmic bias affects all populations equally.', questionType: 'true_false_not_given', correctAnswer: 'False', marks: 1 },
        { questionNumber: 39, questionText: 'Smaller healthcare providers face implementation barriers.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 },
        { questionNumber: 40, questionText: 'AI has the potential to democratize healthcare globally.', questionType: 'true_false_not_given', correctAnswer: 'True', marks: 1 }
    ];

    for (const question of passage3Questions) {
        await db.insert(questions).values({
            partId: passage3[0].id,
            ...question
        });
    }
}

async function seedWritingTest(testId) {
    // Task 1: Chart/graph description
    const task1 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 1,
        title: 'Writing Task 1',
        instructions: 'You should spend about 20 minutes on this task. The chart below shows the percentage of households in different income brackets in a European country from 1980 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
        content: 'The bar chart displays the distribution of households across four income brackets (Low: <€20,000, Medium-Low: €20,000-€40,000, Medium-High: €40,000-€60,000, High: >€60,000) in a European country over four decades (1980, 1990, 2000, 2010, 2020). Data shows significant shifts in income distribution patterns over this period.'
    }).returning({ id: testParts.id });

    await db.insert(questions).values({
        partId: task1[0].id,
        questionNumber: 1,
        questionText: 'Describe the chart showing household income distribution from 1980 to 2020.',
        questionType: 'essay',
        correctAnswer: 'Sample answer should include: overview of trends, specific data points, comparisons between time periods, appropriate vocabulary for describing charts and trends.',
        marks: 4
    });

    // Task 2: Essay writing
    const task2 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 2,
        title: 'Writing Task 2',
        instructions: 'You should spend about 40 minutes on this task. Write about the following topic: Some people believe that universities should focus primarily on preparing students for specific careers, while others argue that higher education should provide a broad, general education. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
        content: 'Essay topic about the purpose of university education - career preparation versus broad education.'
    }).returning({ id: testParts.id });

    await db.insert(questions).values({
        partId: task2[0].id,
        questionNumber: 2,
        questionText: 'Discuss whether universities should focus on career preparation or provide broad education.',
        questionType: 'essay',
        correctAnswer: 'Sample answer should include: clear position, discussion of both views, supporting arguments, relevant examples, logical structure, appropriate academic vocabulary.',
        marks: 5
    });
}

async function seedSpeakingTest(testId) {
    // Part 1: Personal questions
    const part1 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 1,
        title: 'Speaking Part 1 - Introduction and Interview',
        instructions: 'The examiner will ask you questions about yourself, your family, your work or studies, and familiar topics.',
        content: 'Personal questions about daily life, hobbies, and familiar topics.'
    }).returning({ id: testParts.id });

    const part1Questions = [
        { questionNumber: 1, questionText: 'What is your full name?', questionType: 'personal', correctAnswer: 'State your full name clearly', marks: 1 },
        { questionNumber: 2, questionText: 'Where are you from?', questionType: 'personal', correctAnswer: 'Mention your hometown/country', marks: 1 },
        { questionNumber: 3, questionText: 'Do you work or are you a student?', questionType: 'personal', correctAnswer: 'Describe your current status', marks: 1 },
        { questionNumber: 4, questionText: 'What do you like to do in your free time?', questionType: 'personal', correctAnswer: 'Describe hobbies and interests', marks: 1 },
        { questionNumber: 5, questionText: 'How do you usually travel to work or school?', questionType: 'personal', correctAnswer: 'Describe transportation methods', marks: 1 }
    ];

    for (const question of part1Questions) {
        await db.insert(questions).values({
            partId: part1[0].id,
            ...question
        });
    }

    // Part 2: Cue card topic
    const part2 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 2,
        title: 'Speaking Part 2 - Individual Long Turn',
        instructions: 'You will have 1 minute to prepare and then speak for 1-2 minutes on the given topic.',
        content: 'Describe a memorable journey you have taken. You should say: where you went, who you went with, what you did there, and explain why this journey was memorable for you.'
    }).returning({ id: testParts.id });

    await db.insert(questions).values({
        partId: part2[0].id,
        questionNumber: 6,
        questionText: 'Describe a memorable journey you have taken.',
        questionType: 'long_turn',
        correctAnswer: 'Should cover all bullet points: destination, companions, activities, reasons for being memorable',
        marks: 3
    });

    // Part 3: Discussion questions
    const part3 = await db.insert(testParts).values({
        testId: testId,
        partNumber: 3,
        title: 'Speaking Part 3 - Two-way Discussion',
        instructions: 'The examiner will ask you questions related to the Part 2 topic, focusing on more abstract ideas and general issues.',
        content: 'Discussion about travel, tourism, and cultural experiences.'
    }).returning({ id: testParts.id });

    const part3Questions = [
        { questionNumber: 7, questionText: 'Why do people enjoy traveling to different places?', questionType: 'discussion', correctAnswer: 'Discuss various motivations for travel', marks: 2 },
        { questionNumber: 8, questionText: 'How has tourism changed in your country over the years?', questionType: 'discussion', correctAnswer: 'Compare past and present tourism trends', marks: 2 },
        { questionNumber: 9, questionText: 'What are the benefits and drawbacks of international travel?', questionType: 'discussion', correctAnswer: 'Analyze positive and negative aspects', marks: 2 },
        { questionNumber: 10, questionText: 'Do you think virtual reality could replace real travel experiences?', questionType: 'discussion', correctAnswer: 'Compare virtual and real experiences', marks: 1 },
        { questionNumber: 11, questionText: 'How might travel and tourism develop in the future?', questionType: 'discussion', correctAnswer: 'Predict future trends in travel', marks: 1 }
    ];

    for (const question of part3Questions) {
        await db.insert(questions).values({
            partId: part3[0].id,
            ...question
        });
    }
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});