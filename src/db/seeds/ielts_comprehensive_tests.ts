import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';

async function main() {
    // Insert 4 Listening Tests
    const listeningTests = [
        {
            title: 'IELTS Listening Test 1',
            description: 'Practice test focusing on everyday social situations and academic contexts',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'IELTS Listening Test 2',
            description: 'Comprehensive listening practice with varied accents and topics',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'IELTS Listening Test 3',
            description: 'Advanced listening skills with academic lectures and discussions',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-25').toISOString(),
        },
        {
            title: 'IELTS Listening Test 4',
            description: 'Final listening assessment with complex academic content',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-30').toISOString(),
        }
    ];

    const insertedListeningTests = await db.insert(tests).values(listeningTests).returning({ id: tests.id });

    // Insert 4 Reading Tests
    const readingTests = [
        {
            title: 'IELTS Reading Test 1',
            description: 'Academic reading passages on science and technology topics',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-01').toISOString(),
        },
        {
            title: 'IELTS Reading Test 2',
            description: 'Complex texts covering environmental and social issues',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-05').toISOString(),
        },
        {
            title: 'IELTS Reading Test 3',
            description: 'Academic passages on psychology and human behavior',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-10').toISOString(),
        },
        {
            title: 'IELTS Reading Test 4',
            description: 'Advanced reading comprehension with scientific research topics',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-15').toISOString(),
        }
    ];

    const insertedReadingTests = await db.insert(tests).values(readingTests).returning({ id: tests.id });

    // Insert 4 Writing Tests
    const writingTests = [
        {
            title: 'IELTS Writing Test 1',
            description: 'Task 1: Chart description, Task 2: Opinion essay on education',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-02-20').toISOString(),
        },
        {
            title: 'IELTS Writing Test 2',
            description: 'Task 1: Process diagram, Task 2: Discussion essay on technology',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-02-25').toISOString(),
        },
        {
            title: 'IELTS Writing Test 3',
            description: 'Task 1: Table analysis, Task 2: Problem-solution essay on environment',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-03-01').toISOString(),
        },
        {
            title: 'IELTS Writing Test 4',
            description: 'Task 1: Bar chart comparison, Task 2: Advantages-disadvantages essay',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-03-05').toISOString(),
        }
    ];

    const insertedWritingTests = await db.insert(tests).values(writingTests).returning({ id: tests.id });

    // Insert 4 Speaking Tests
    const speakingTests = [
        {
            title: 'IELTS Speaking Test 1',
            description: 'Personal questions, cue card on hobbies, discussion on leisure activities',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-10').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 2',
            description: 'Work and study questions, cue card on travel, discussion on globalization',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-15').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 3',
            description: 'Home and family questions, cue card on technology, discussion on innovation',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-20').toISOString(),
        },
        {
            title: 'IELTS Speaking Test 4',
            description: 'Education questions, cue card on achievements, discussion on success',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-25').toISOString(),
        }
    ];

    const insertedSpeakingTests = await db.insert(tests).values(speakingTests).returning({ id: tests.id });

    // Insert Test Parts for Listening Tests
    const listeningParts = [
        // Listening Test 1 Parts
        {
            testId: insertedListeningTests[0].id,
            partNumber: 1,
            title: 'Hotel Booking Conversation',
            instructions: 'You will hear a conversation between a customer and hotel receptionist. Complete the form with the correct information.',
            content: 'Hotel booking form completion',
            audioUrl: '/audio/listening/test1/part1.mp3',
            listeningScript: 'Receptionist: Good morning, Grand Hotel. How can I help you?\nCustomer: Hi, I would like to make a reservation for next weekend.\nReceptionist: Certainly. Can I have your name please?\nCustomer: Yes, it\'s Sarah Johnson, that\'s J-O-H-N-S-O-N.\nReceptionist: Thank you Ms. Johnson. And what dates are you looking for?\nCustomer: I need a room from Friday the 15th to Sunday the 17th of March.\nReceptionist: Perfect. And how many guests will be staying?\nCustomer: Just myself, so one person.\nReceptionist: Would you prefer a standard room or a deluxe room?\nCustomer: What\'s the difference in price?\nReceptionist: A standard room is £95 per night, and a deluxe room is £125 per night.\nCustomer: I\'ll take the standard room, please.'
        },
        {
            testId: insertedListeningTests[0].id,
            partNumber: 2,
            title: 'Museum Tour Guide',
            instructions: 'You will hear a tour guide talking about a museum exhibition. Choose the correct letter A, B, or C.',
            content: 'Museum exhibition tour',
            audioUrl: '/audio/listening/test1/part2.mp3',
            listeningScript: 'Welcome everyone to the Natural History Museum. I\'m David, and I\'ll be your guide today. We\'re starting here in the main hall with our famous dinosaur collection. The centerpiece is our Tyrannosaurus Rex skeleton, which was discovered in Montana in 1995. It\'s one of the most complete T-Rex skeletons ever found, with over 85% of the bones intact. The skeleton stands 4 meters high and 12 meters long. Moving to our left, we have the Triceratops display. This herbivorous dinosaur lived approximately 68 million years ago during the late Cretaceous period.'
        },
        {
            testId: insertedListeningTests[0].id,
            partNumber: 3,
            title: 'Student Discussion on Assignment',
            instructions: 'You will hear a conversation between two students and their tutor discussing a group project. Answer the questions.',
            content: 'Academic discussion about group project',
            audioUrl: '/audio/listening/test1/part3.mp3',
            listeningScript: 'Tutor: So, how is your group project on renewable energy progressing?\nStudent A: Well, we\'ve divided the work into three main sections. I\'m focusing on solar energy.\nStudent B: And I\'m researching wind power. We\'re planning to meet again on Thursday to discuss our findings.\nTutor: That sounds good. Have you considered including hydroelectric power in your analysis?\nStudent A: We discussed it, but we thought three energy sources might be too much for a 3000-word report.\nTutor: Actually, I think including hydroelectric power would strengthen your argument. You could reduce the detail on solar and wind slightly.\nStudent B: That\'s a good point. We could probably manage that.\nTutor: What about your methodology? How are you gathering your data?\nStudent A: We\'re using a combination of academic journals and government reports.\nStudent B: Plus some recent statistics from the International Energy Agency.'
        },
        {
            testId: insertedListeningTests[0].id,
            partNumber: 4,
            title: 'Marine Biology Lecture',
            instructions: 'You will hear a lecture about coral reef ecosystems. Complete the notes with NO MORE THAN TWO WORDS.',
            content: 'Academic lecture on coral reefs',
            audioUrl: '/audio/listening/test1/part4.mp3',
            listeningScript: 'Today I want to discuss the fascinating ecosystem of coral reefs. Coral reefs are among the most biodiverse ecosystems on Earth, supporting approximately 25% of all marine species despite covering less than 1% of the ocean floor. The foundation of these ecosystems consists of coral polyps, tiny animals that form a symbiotic relationship with algae called zooxanthellae. These algae live within the coral tissues and provide up to 90% of the coral\'s energy through photosynthesis. In return, the coral provides the algae with protection and nutrients. This relationship is extremely sensitive to environmental changes, particularly temperature fluctuations. When water temperatures rise by just 1-2 degrees Celsius above normal for extended periods, corals expel their zooxanthellae in a process called coral bleaching.'
        }
    ];

    await db.insert(testParts).values(listeningParts);

    // Insert Test Parts for Reading Tests
    const readingParts = [
        // Reading Test 1 Parts
        {
            testId: insertedReadingTests[0].id,
            partNumber: 1,
            title: 'The Evolution of Artificial Intelligence',
            instructions: 'Read the passage and answer questions 1-13.',
            content: 'Artificial Intelligence (AI) has undergone remarkable development since its inception in the 1950s. Initially conceptualized by computer scientist Alan Turing, AI began as theoretical frameworks for machine learning and computational thinking. The term "artificial intelligence" was first coined by John McCarthy in 1956 during the Dartmouth Conference, marking the official birth of AI as an academic discipline.\n\nThe early decades of AI research were characterized by optimistic predictions and significant government funding. Researchers believed that human-level AI was achievable within decades. However, the 1970s and 1980s brought what became known as "AI winters" - periods of reduced funding and diminished interest due to unmet expectations and technical limitations.\n\nThe resurgence of AI began in the 1990s with the development of more sophisticated algorithms and increased computational power. Machine learning techniques, particularly neural networks, showed promise in pattern recognition and data analysis. The victory of IBM\'s Deep Blue over world chess champion Garry Kasparov in 1997 demonstrated AI\'s potential in strategic thinking.\n\nThe 21st century has witnessed unprecedented advancement in AI capabilities. Deep learning, a subset of machine learning inspired by the structure of the human brain, has revolutionized fields such as image recognition, natural language processing, and autonomous systems. Companies like Google, Facebook, and Amazon have invested billions in AI research, leading to breakthrough applications in search algorithms, recommendation systems, and virtual assistants.\n\nToday, AI permeates numerous aspects of daily life. From smartphone voice assistants to recommendation engines on streaming platforms, AI technologies have become integral to modern society. In healthcare, AI assists in medical diagnosis and drug discovery. In transportation, autonomous vehicles represent the culmination of decades of AI research. Financial institutions employ AI for fraud detection and algorithmic trading.\n\nDespite these achievements, AI development faces significant challenges. Ethical concerns regarding privacy, bias, and job displacement require careful consideration. The "black box" nature of many AI systems raises questions about transparency and accountability. Additionally, the environmental impact of training large AI models has become a growing concern.\n\nLooking forward, experts predict continued advancement in AI capabilities. Quantum computing may provide the computational power necessary for more sophisticated AI systems. However, the timeline for achieving artificial general intelligence (AGI) remains uncertain, with predictions ranging from decades to centuries.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: insertedReadingTests[0].id,
            partNumber: 2,
            title: 'Climate Change and Arctic Ice Loss',
            instructions: 'Read the passage and answer questions 14-27.',
            content: 'The Arctic region is experiencing climate change at twice the global average rate, a phenomenon known as Arctic amplification. This accelerated warming has profound implications for global climate systems, sea levels, and biodiversity. The most visible manifestation of Arctic climate change is the dramatic reduction in sea ice extent and thickness.\n\nSatellite observations since 1979 reveal a consistent decline in Arctic sea ice coverage. The minimum ice extent, typically reached in September, has decreased at a rate of approximately 13% per decade. The 2012 ice minimum was the lowest on record, covering just 3.4 million square kilometers compared to the 1979-2000 average of 6.14 million square kilometers. This reduction represents an area larger than India disappearing from ice coverage.\n\nThe mechanisms driving Arctic ice loss are complex and interconnected. Rising atmospheric temperatures directly increase ice melting, but feedback loops amplify this effect. As white ice disappears, it exposes darker ocean water that absorbs more solar radiation, further warming the region. This ice-albedo feedback is a primary driver of Arctic amplification.\n\nChanges in atmospheric circulation patterns also contribute to ice loss. The Arctic Oscillation, a climate pattern affecting atmospheric pressure distributions, influences wind patterns that can either compress ice together or spread it apart. In recent years, atmospheric patterns have increasingly favored ice dispersal and melting.\n\nThe implications of Arctic ice loss extend far beyond the polar region. Sea ice plays a crucial role in regulating global ocean circulation through its influence on water density and salinity. The loss of ice affects the formation of deep water masses that drive global thermohaline circulation, potentially altering weather patterns worldwide.\n\nWildlife populations dependent on sea ice face unprecedented challenges. Polar bears, which rely on ice platforms for hunting seals, have experienced population declines in several regions. Arctic seals, walruses, and seabirds also depend on ice for breeding and feeding habitats. Indigenous communities whose traditional lifestyles are intimately connected to sea ice face cultural and economic disruption.\n\nThe economic implications of ice loss are substantial. Reduced ice coverage opens new shipping routes through the Arctic, potentially reducing global shipping costs and times. However, the infrastructure required to support increased Arctic shipping poses environmental risks. Additionally, easier access to Arctic oil and gas reserves raises concerns about accelerating fossil fuel extraction in a region already experiencing severe climate impacts.\n\nEfforts to address Arctic ice loss require global cooperation on greenhouse gas emissions reduction. While local conservation measures are important, the primary driver of ice loss is global warming caused by atmospheric greenhouse gas concentrations. International agreements like the Paris Climate Accord aim to limit global temperature increases, but current commitments may be insufficient to prevent continued Arctic ice decline.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: insertedReadingTests[0].id,
            partNumber: 3,
            title: 'The Psychology of Decision-Making Under Uncertainty',
            instructions: 'Read the passage and answer questions 28-40.',
            content: 'Human decision-making under conditions of uncertainty has fascinated psychologists and economists for decades. Traditional economic theory assumed that individuals make rational choices to maximize utility, but empirical research reveals systematic deviations from this rational model. These findings have given rise to behavioral economics, a field that incorporates psychological insights into economic analysis.\n\nOne of the most significant discoveries in decision-making research is the concept of cognitive biases - systematic errors in thinking that influence judgment and decision-making. Confirmation bias leads people to seek information that confirms their existing beliefs while ignoring contradictory evidence. Availability heuristic causes individuals to overestimate the probability of events that are easily recalled, often due to recent exposure or emotional impact.\n\nProspect theory, developed by Daniel Kahneman and Amos Tversky, revolutionized understanding of decision-making under risk. The theory demonstrates that people evaluate potential losses and gains differently, exhibiting loss aversion - the tendency to prefer avoiding losses over acquiring equivalent gains. Additionally, people tend to overweight small probabilities and underweight large probabilities, leading to suboptimal decision-making in situations involving risk.\n\nThe framing effect illustrates how the presentation of information influences choices. Identical options presented as gains versus losses can lead to different decisions. For example, a medical treatment described as having a 90% survival rate is more likely to be chosen than one described as having a 10% mortality rate, despite being statistically equivalent.\n\nAnchoring bias affects decision-making by causing individuals to rely heavily on the first piece of information encountered. In negotiations, the initial offer serves as an anchor that influences subsequent offers and counteroffers. This bias persists even when the anchor is obviously irrelevant to the decision at hand.\n\nEmotional factors play a crucial role in decision-making processes. The affect heuristic suggests that people make judgments based on their emotional responses to stimuli rather than objective analysis. Positive emotions can lead to optimistic risk assessments, while negative emotions promote conservative decision-making.\n\nRecent neuroscientific research has identified brain regions involved in decision-making under uncertainty. The prefrontal cortex, responsible for executive functions, shows increased activation during complex decision-making tasks. The anterior cingulate cortex responds to conflicting information and uncertainty. The amygdala, associated with emotional processing, influences risk perception and decision-making.\n\nCultural factors also influence decision-making patterns. Individualistic cultures tend to emphasize personal choice and autonomy, while collectivistic cultures prioritize group harmony and consensus. These cultural differences manifest in varying approaches to risk-taking, time orientation, and decision-making processes.\n\nUnderstanding decision-making biases has practical applications in various fields. In finance, behavioral insights help explain market anomalies and investor behavior. In healthcare, knowledge of framing effects and risk perception informs patient communication strategies. In public policy, nudging techniques leverage behavioral insights to encourage beneficial choices while preserving individual freedom.\n\nDespite advances in understanding decision-making psychology, many questions remain. The interaction between emotional and rational systems in the brain requires further investigation. Additionally, the development of effective interventions to improve decision-making quality remains an active area of research.',
            audioUrl: null,
            listeningScript: null
        }
    ];

    await db.insert(testParts).values(readingParts);

    // Insert Test Parts for Writing Tests
    const writingParts = [
        // Writing Test 1 Parts
        {
            testId: insertedWritingTests[0].id,
            partNumber: 1,
            title: 'Chart Description Task',
            instructions: 'The chart below shows the percentage of households with different types of internet connection in a European country between 2010 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
            content: 'Bar chart showing broadband, dial-up, and mobile internet adoption rates over time. Broadband increased from 45% to 78%, dial-up decreased from 25% to 3%, and mobile internet grew from 5% to 65%.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: insertedWritingTests[0].id,
            partNumber: 2,
            title: 'Education Opinion Essay',
            instructions: 'Some people believe that children should start learning a foreign language at primary school rather than secondary school. Do the advantages of this outweigh the disadvantages? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
            content: 'Essay prompt about early foreign language learning in primary vs secondary education.',
            audioUrl: null,
            listeningScript: null
        }
    ];

    await db.insert(testParts).values(writingParts);

    // Insert Test Parts for Speaking Tests
    const speakingParts = [
        // Speaking Test 1 Parts
        {
            testId: insertedSpeakingTests[0].id,
            partNumber: 1,
            title: 'Personal Questions',
            instructions: 'The examiner will ask you questions about yourself, your home, work or studies, and familiar topics.',
            content: 'Questions about hobbies, daily routine, hometown, and personal preferences.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: insertedSpeakingTests[0].id,
            partNumber: 2,
            title: 'Individual Long Turn - Hobby',
            instructions: 'You will have 1 minute to prepare and 1-2 minutes to speak about the topic on the card.',
            content: 'Describe a hobby you enjoy. You should say: what the hobby is, when you started it, why you enjoy it, and explain how it has benefited you.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: insertedSpeakingTests[0].id,
            partNumber: 3,
            title: 'Discussion - Leisure Activities',
            instructions: 'The examiner will ask you questions related to the topic in Part 2.',
            content: 'Discussion about leisure activities, work-life balance, and how hobbies have changed over time.',
            audioUrl: null,
            listeningScript: null
        }
    ];

    await db.insert(testParts).values(speakingParts);

    // Get all inserted test parts to create questions
    const allParts = await db.select().from(testParts);

    // Sample questions for different parts
    const sampleQuestions = [
        // Listening Test 1, Part 1 questions (Hotel booking)
        {
            partId: allParts.find(p => p.testId === insertedListeningTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 1,
            questionText: 'Customer\'s surname: ___________',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: 'Johnson',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedListeningTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 2,
            questionText: 'Check-in date: Friday ___________',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: '15th March',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedListeningTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 3,
            questionText: 'Number of nights: ___________',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: '2',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedListeningTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 4,
            questionText: 'Room type: ___________',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: 'standard',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedListeningTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 5,
            questionText: 'Price per night: £___________',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: '95',
            marks: 1
        },

        // Reading Test 1, Part 1 questions (AI Evolution)
        {
            partId: allParts.find(p => p.testId === insertedReadingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 1,
            questionText: 'The term "artificial intelligence" was first used in 1956.',
            questionType: 'true_false_not_given',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'True',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedReadingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 2,
            questionText: 'AI research in the 1970s and 1980s was well-funded throughout.',
            questionType: 'true_false_not_given',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'False',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedReadingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 3,
            questionText: 'Deep Blue defeated Garry Kasparov in which year?',
            questionType: 'multiple_choice',
            options: ['1995', '1996', '1997', '1998'],
            correctAnswer: '1997',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedReadingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 4,
            questionText: 'Which companies have invested billions in AI research?',
            questionType: 'multiple_choice',
            options: ['Google, Apple, Microsoft', 'Google, Facebook, Amazon', 'Facebook, Apple, Tesla', 'Amazon, Microsoft, Tesla'],
            correctAnswer: 'Google, Facebook, Amazon',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedReadingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 5,
            questionText: 'AI is used in healthcare for ___________ and drug discovery.',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: 'medical diagnosis',
            marks: 1
        },

        // Writing Test 1, Task 1 questions
        {
            partId: allParts.find(p => p.testId === insertedWritingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 1,
            questionText: 'Write a report describing the chart showing internet connection types from 2010-2020.',
            questionType: 'task_1_chart',
            options: null,
            correctAnswer: 'Sample answer covering main trends: broadband growth, dial-up decline, mobile internet emergence',
            marks: 4
        },

        // Writing Test 1, Task 2 questions
        {
            partId: allParts.find(p => p.testId === insertedWritingTests[0].id && p.partNumber === 2)?.id,
            questionNumber: 1,
            questionText: 'Write an essay discussing whether children should learn foreign languages in primary or secondary school.',
            questionType: 'task_2_opinion',
            options: null,
            correctAnswer: 'Sample answer weighing advantages (cognitive development, natural acquisition) against disadvantages (curriculum overload, resource constraints)',
            marks: 5
        },

        // Speaking Test 1, Part 1 questions
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 1,
            questionText: 'What is your full name?',
            questionType: 'personal_question',
            options: null,
            correctAnswer: 'Personal response',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 2,
            questionText: 'Where are you from?',
            questionType: 'personal_question',
            options: null,
            correctAnswer: 'Personal response',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 3,
            questionText: 'Do you work or study?',
            questionType: 'personal_question',
            options: null,
            correctAnswer: 'Personal response',
            marks: 1
        },
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 1)?.id,
            questionNumber: 4,
            questionText: 'What do you like to do in your free time?',
            questionType: 'personal_question',
            options: null,
            correctAnswer: 'Personal response about hobbies',
            marks: 1
        },

        // Speaking Test 1, Part 2 questions
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 2)?.id,
            questionNumber: 1,
            questionText: 'Describe a hobby you enjoy',
            questionType: 'cue_card',
            options: null,
            correctAnswer: '2-minute response covering what the hobby is, when started, why enjoyed, and benefits',
            marks: 3
        },

        // Speaking Test 1, Part 3 questions
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 3)?.id,
            questionNumber: 1,
            questionText: 'How important are hobbies for people?',
            questionType: 'discussion_question',
            options: null,
            correctAnswer: 'Discussion about stress relief, skill development, social connection',
            marks: 2
        },
        {
            partId: allParts.find(p => p.testId === insertedSpeakingTests[0].id && p.partNumber === 3)?.id,
            questionNumber: 2,
            questionText: 'Do you think people have less time for hobbies now than in the past?',
            questionType: 'discussion_question',
            options: null,
            correctAnswer: 'Discussion about modern lifestyle, work pressures, technology impact',
            marks: 2
        }
    ];

    await db.insert(questions).values(sampleQuestions.filter(q => q.partId !== undefined));
    
    console.log('✅ IELTS comprehensive test seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});