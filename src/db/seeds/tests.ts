import { db } from '@/db';
import { tests, testParts, questions } from '@/db/schema';

async function main() {
    // First, insert the tests
    const testsData = [
        // Listening Tests
        {
            title: 'IELTS Listening Practice Test 1',
            description: 'Complete IELTS Listening test with 4 sections covering social situations, monologue, academic discussion, and lecture',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'IELTS Listening Practice Test 2',
            description: 'IELTS Listening practice test focusing on accommodation booking, museum tour, student discussion, and archaeology lecture',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'IELTS Listening Practice Test 3',
            description: 'Comprehensive IELTS Listening test with travel booking, health presentation, tutorial discussion, and business lecture',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-25').toISOString(),
        },
        {
            title: 'IELTS Listening Practice Test 4',
            description: 'IELTS Listening test covering library membership, wildlife documentary, group project meeting, and environmental science lecture',
            type: 'listening',
            duration: 40,
            totalMarks: 40,
            createdAt: new Date('2024-01-30').toISOString(),
        },
        // Reading Tests
        {
            title: 'IELTS Reading Practice Test 1',
            description: 'Academic Reading test with passages on climate change, artificial intelligence, and ancient civilizations',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-01').toISOString(),
        },
        {
            title: 'IELTS Reading Practice Test 2',
            description: 'IELTS Academic Reading covering renewable energy, cognitive psychology, and urban planning topics',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-05').toISOString(),
        },
        {
            title: 'IELTS Reading Practice Test 3',
            description: 'Academic Reading test featuring marine biology, digital technology, and archaeological research passages',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-10').toISOString(),
        },
        {
            title: 'IELTS Reading Practice Test 4',
            description: 'IELTS Reading practice with texts on space exploration, social media impact, and cultural preservation',
            type: 'reading',
            duration: 60,
            totalMarks: 40,
            createdAt: new Date('2024-02-15').toISOString(),
        },
        // Writing Tests
        {
            title: 'IELTS Writing Practice Test 1',
            description: 'Academic Writing test with Task 1 bar chart analysis and Task 2 education essay',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-02-20').toISOString(),
        },
        {
            title: 'IELTS Writing Practice Test 2',
            description: 'IELTS Writing test featuring Task 1 line graph and Task 2 technology discussion',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-02-25').toISOString(),
        },
        {
            title: 'IELTS Writing Practice Test 3',
            description: 'Academic Writing with Task 1 process diagram and Task 2 environmental issue essay',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-03-01').toISOString(),
        },
        {
            title: 'IELTS Writing Practice Test 4',
            description: 'IELTS Writing test with Task 1 table data analysis and Task 2 social issues essay',
            type: 'writing',
            duration: 60,
            totalMarks: 9,
            createdAt: new Date('2024-03-05').toISOString(),
        },
        // Speaking Tests
        {
            title: 'IELTS Speaking Practice Test 1',
            description: 'Complete Speaking test covering personal topics, hometown description, and technology discussion',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-10').toISOString(),
        },
        {
            title: 'IELTS Speaking Practice Test 2',
            description: 'IELTS Speaking test with questions about work, memorable journey, and education topics',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-15').toISOString(),
        },
        {
            title: 'IELTS Speaking Practice Test 3',
            description: 'Speaking practice test covering hobbies, special occasion description, and environmental issues',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-20').toISOString(),
        },
        {
            title: 'IELTS Speaking Practice Test 4',
            description: 'Comprehensive Speaking test with family topics, skill learning, and cultural discussion',
            type: 'speaking',
            duration: 15,
            totalMarks: 9,
            createdAt: new Date('2024-03-25').toISOString(),
        },
    ];

    await db.insert(tests).values(testsData);

    // Test Parts Data
    const testPartsData = [
        // Listening Test 1 Parts
        {
            testId: 1,
            partNumber: 1,
            title: 'Hotel Booking Conversation',
            instructions: 'You will hear a conversation between a customer and a hotel receptionist. Complete the form with NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
            content: 'Booking form completion for Grand Hotel reservation',
            audioUrl: 'https://ielts-audio.com/listening-test-1-part-1.mp3',
            listeningScript: 'Receptionist: Good morning, Grand Hotel. How can I help you?\nCustomer: Hi, I would like to make a reservation for next weekend.\nReceptionist: Certainly. Could I have your name please?\nCustomer: Yes, its Sarah Johnson, thats J-O-H-N-S-O-N.\nReceptionist: Thank you Ms Johnson. And for which dates would you like the reservation?\nCustomer: From Friday the 15th to Sunday the 17th of March.\nReceptionist: Perfect. How many guests will there be?\nCustomer: Just two adults.\nReceptionist: And what type of room would you prefer?\nCustomer: A double room with sea view if possible.\nReceptionist: Yes, we have availability. The rate for a sea view double room is 180 pounds per night.\nCustomer: That sounds good. Can I also book dinner at your restaurant?\nReceptionist: Of course. We serve dinner from 6 PM to 10 PM. Would you like me to make a reservation?\nCustomer: Yes please, for Saturday evening at 7:30.\nReceptionist: Perfect. And could I have a contact number?\nCustomer: Sure, its 07892 456 123.\nReceptionist: Thank you. Your reservation is confirmed.'
        },
        {
            testId: 1,
            partNumber: 2,
            title: 'City Museum Tour Guide',
            instructions: 'You will hear a tour guide talking about the City Museum. Choose the correct letter A, B, or C.',
            content: 'Information about museum facilities, opening hours, and special exhibitions',
            audioUrl: 'https://ielts-audio.com/listening-test-1-part-2.mp3',
            listeningScript: 'Welcome to the City Museum. I am your guide today, and I will be showing you around our main exhibitions. The museum was founded in 1923 and houses one of the largest collections of local artifacts in the country. We are open Tuesday to Sunday from 9 AM to 5 PM, and we are closed on Mondays except during school holidays. The entrance fee is 12 pounds for adults and 8 pounds for children under 16. Senior citizens and students receive a 20% discount. Our special exhibition this month features ancient Roman artifacts discovered locally. The exhibition is located on the second floor and includes interactive displays and virtual reality experiences. Please note that photography is not allowed in the Roman exhibition, but it is permitted in other areas of the museum. We have a gift shop on the ground floor and a café on the third floor which serves light meals and refreshments. The café is open from 10 AM to 4 PM. For your safety, please stay with the group and do not touch any exhibits unless specifically indicated. If you have any questions during the tour, please do not hesitate to ask.'
        },
        {
            testId: 1,
            partNumber: 3,
            title: 'Student Discussion about Research Project',
            instructions: 'You will hear a conversation between two students and their tutor discussing a research project. Answer the questions using NO MORE THAN TWO WORDS.',
            content: 'Academic discussion about climate change research methodology',
            audioUrl: 'https://ielts-audio.com/listening-test-1-part-3.mp3',
            listeningScript: 'Tutor: So, how are you both getting on with your climate change research project?\nStudent A: Well, we have been focusing on temperature data from the last century.\nStudent B: Yes, and we have found some interesting patterns in the data.\nTutor: That sounds promising. What methodology are you using for your analysis?\nStudent A: We are using statistical analysis software to identify trends.\nStudent B: And we are also comparing data from different regions to see if there are significant variations.\nTutor: Good approach. Have you considered any potential limitations in your data?\nStudent A: Yes, we noted that some weather stations have incomplete records.\nStudent B: And the measurement techniques have changed over time, which might affect accuracy.\nTutor: Excellent points. What about your literature review?\nStudent A: We have reviewed about 50 academic papers so far.\nStudent B: Most of them support the hypothesis that global temperatures are rising.\nTutor: And what will be your main conclusion?\nStudent A: We expect to demonstrate a clear warming trend.\nStudent B: With particular acceleration in the last 30 years.\nTutor: That aligns with current scientific consensus. Make sure you present your findings clearly in the final report.'
        },
        {
            testId: 1,
            partNumber: 4,
            title: 'Lecture on Renewable Energy Sources',
            instructions: 'You will hear a lecture about renewable energy. Complete the notes using NO MORE THAN THREE WORDS for each answer.',
            content: 'Academic lecture covering solar, wind, and hydroelectric power generation',
            audioUrl: 'https://ielts-audio.com/listening-test-1-part-4.mp3',
            listeningScript: 'Today I will be discussing renewable energy sources and their potential to replace fossil fuels. Renewable energy comes from natural sources that are constantly replenished. The main types include solar, wind, hydroelectric, geothermal, and biomass energy. Solar energy is captured using photovoltaic panels that convert sunlight directly into electricity. The efficiency of modern solar panels has improved significantly, reaching up to 22% in commercial applications. Wind energy utilizes turbines to harness the kinetic energy of moving air. Modern wind turbines can generate between 2 and 3 megawatts of power each. Hydroelectric power uses flowing water to turn turbines and generate electricity. It currently provides about 16% of the worlds electricity supply. One advantage of renewable energy is that it produces minimal greenhouse gas emissions during operation. However, there are challenges including intermittency - solar panels do not generate power at night, and wind turbines require consistent wind speeds. Energy storage systems such as lithium batteries are being developed to address these issues. The cost of renewable energy has decreased dramatically over the past decade, making it competitive with fossil fuels in many markets. Government subsidies and carbon pricing policies are also encouraging adoption of renewable technologies.'
        },

        // Reading Test 1 Parts
        {
            testId: 5,
            partNumber: 1,
            title: 'Climate Change and Arctic Ice',
            instructions: 'Read the passage and answer questions 1-13. Choose TRUE, FALSE, or NOT GIVEN for statements 1-7, and complete the summary for questions 8-13.',
            content: 'The Arctic region is experiencing some of the most dramatic effects of climate change on Earth. Scientists have been monitoring the decline of Arctic sea ice for several decades, and the data reveals alarming trends. The Arctic sea ice extent has been decreasing at a rate of approximately 13% per decade since satellite observations began in 1979. This reduction is particularly pronounced during summer months when the ice reaches its minimum extent. The loss of Arctic ice has far-reaching consequences beyond the polar region. Ice serves as a natural reflector, bouncing solar radiation back into space. When ice melts, it exposes darker ocean water that absorbs more heat, creating a positive feedback loop that accelerates warming. This phenomenon, known as the albedo effect, amplifies global temperature increases. The shrinking ice cover also affects Arctic wildlife, particularly polar bears whose hunting grounds are disappearing. Marine ecosystems are disrupted as the timing of ice formation and melting changes, affecting the food chain from microscopic organisms to large marine mammals. Furthermore, the loss of Arctic ice contributes to global sea level rise, though to a lesser extent than ice sheet melting in Greenland and Antarctica. The changing Arctic also opens new possibilities for shipping routes and resource extraction, creating geopolitical tensions as nations compete for access to previously inaccessible areas. Scientists emphasize that immediate action on reducing greenhouse gas emissions is crucial to slow these changes and preserve Arctic ecosystems for future generations.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: 5,
            partNumber: 2,
            title: 'The Development of Artificial Intelligence',
            instructions: 'Read the passage and answer questions 14-26. Match headings A-H to paragraphs 1-6, and complete the flowchart for questions 20-26.',
            content: 'Artificial Intelligence has evolved from a theoretical concept to a practical technology that influences many aspects of modern life. The field emerged in the 1950s when computer scientists began exploring whether machines could simulate human intelligence. Early AI research focused on symbolic reasoning and problem-solving, leading to the development of expert systems in the 1970s and 1980s. These systems could make decisions based on predefined rules and were successfully applied in medical diagnosis and financial analysis. However, progress stalled during the "AI winter" periods when funding decreased due to unmet expectations and technical limitations. The resurgence of AI began in the 1990s with advances in computational power and the development of machine learning algorithms. Machine learning represents a fundamental shift from rule-based systems to data-driven approaches where computers learn patterns from large datasets. Deep learning, a subset of machine learning inspired by neural networks in the human brain, has been particularly transformative. Deep learning algorithms can process vast amounts of unstructured data such as images, speech, and text, enabling breakthrough applications in computer vision, natural language processing, and speech recognition. The availability of big data and powerful graphics processing units has accelerated deep learning research, leading to superhuman performance in specific tasks like image classification and game playing. Today, AI applications are ubiquitous, from recommendation systems on streaming platforms to autonomous vehicles and virtual assistants. Despite these advances, current AI systems are narrow, excelling at specific tasks but lacking general intelligence. Researchers continue working toward artificial general intelligence that could match human cognitive abilities across diverse domains.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: 5,
            partNumber: 3,
            title: 'Archaeological Discoveries in Pompeii',
            instructions: 'Read the passage and answer questions 27-40. Choose the correct letter A, B, C, or D for multiple choice questions 27-32, and complete the sentences for questions 33-40.',
            content: 'The ancient Roman city of Pompeii continues to yield remarkable archaeological discoveries nearly three centuries after excavations began. Located near Naples in southern Italy, Pompeii was buried under volcanic ash when Mount Vesuvius erupted in 79 AD, preserving the city in extraordinary detail. Recent excavations in the Regio V area have uncovered a wealthy neighborhood with elaborate frescoes, mosaics, and intact household items that provide unprecedented insights into daily life in ancient Rome. One of the most significant recent discoveries is the House of the Garden, a luxurious villa featuring sophisticated hydraulic systems and ornate decorations. The house contains a large garden with fountains and water features that demonstrate advanced engineering techniques. Archaeologists have also found evidence of commercial activities, including a thermopolium (ancient fast food establishment) complete with decorated counters and storage containers for hot food. The preservation conditions in Pompeii are unique due to the rapid burial under pyroclastic flows that sealed buildings and their contents. Unlike other archaeological sites where organic materials decay over time, Pompeii contains wooden furniture, food remains, and even human bodies preserved as casts. These casts are created by injecting plaster into voids left by decomposed bodies, revealing the final moments of Pompeii residents. Advanced technologies are revolutionizing archaeological work in Pompeii. Ground-penetrating radar helps identify buried structures before excavation, while 3D scanning creates detailed digital records of artifacts and buildings. DNA analysis of human remains provides information about diet, health, and population genetics in ancient Rome. Despite ongoing excavations, archaeologists estimate that one-third of Pompeii remains unexcavated, promising continued discoveries that will enhance our understanding of Roman civilization.',
            audioUrl: null,
            listeningScript: null
        },

        // Writing Test 1 Parts
        {
            testId: 9,
            partNumber: 1,
            title: 'Task 1: Bar Chart Analysis',
            instructions: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
            content: 'Bar chart showing housing tenure trends over time with owned accommodation increasing from 23% in 1918 to 68% in 2001, then slightly declining to 64% in 2011, while rented accommodation shows the opposite trend.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: 9,
            partNumber: 2,
            title: 'Task 2: Education Essay',
            instructions: 'Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. Discuss both these views and give your own opinion. Write at least 250 words.',
            content: 'Academic essay question about university education and subject choice, requiring discussion of both perspectives and personal opinion with supporting arguments.',
            audioUrl: null,
            listeningScript: null
        },

        // Speaking Test 1 Parts
        {
            testId: 13,
            partNumber: 1,
            title: 'Part 1: Introduction and Interview',
            instructions: 'The examiner will ask you questions about yourself, your home, work or studies and familiar topics. This part lasts 4-5 minutes.',
            content: 'General questions about hometown, family, work/studies, hobbies, and daily routines to help candidates warm up and demonstrate basic communication skills.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: 13,
            partNumber: 2,
            title: 'Part 2: Long Turn',
            instructions: 'You will be given a topic card. You have one minute to prepare and should speak for 1-2 minutes. The examiner may ask one or two follow-up questions.',
            content: 'Cue card topic: Describe a piece of technology you find useful. You should say: what it is, how you use it, how often you use it, and explain why you find it useful.',
            audioUrl: null,
            listeningScript: null
        },
        {
            testId: 13,
            partNumber: 3,
            title: 'Part 3: Discussion',
            instructions: 'The examiner will ask you questions related to the topic in Part 2. This part lasts 4-5 minutes and focuses on abstract ideas and issues.',
            content: 'Discussion questions about technology in education, digital divide, future technological developments, and the impact of technology on social relationships.',
            audioUrl: null,
            listeningScript: null
        }
    ];

    await db.insert(testParts).values(testPartsData);

    // Sample Questions Data (showing examples for different test types)
    const questionsData = [
        // Listening Test 1, Part 1 Questions
        {
            partId: 1,
            questionNumber: 1,
            questionText: 'Name of customer:',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: 'Sarah Johnson',
            marks: 1
        },
        {
            partId: 1,
            questionNumber: 2,
            questionText: 'Arrival date:',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: 'Friday 15th March',
            marks: 1
        },
        {
            partId: 1,
            questionNumber: 3,
            questionText: 'Number of nights:',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: '2',
            marks: 1
        },
        {
            partId: 1,
            questionNumber: 4,
            questionText: 'Room type required:',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: 'double room with sea view',
            marks: 1
        },
        {
            partId: 1,
            questionNumber: 5,
            questionText: 'Cost per night: £',
            questionType: 'gap_fill',
            options: null,
            correctAnswer: '180',
            marks: 1
        },

        // Reading Test 1, Part 1 Questions
        {
            partId: 5,
            questionNumber: 1,
            questionText: 'Arctic sea ice has been declining at a rate of 13% per decade since 1979.',
            questionType: 'true_false_not_given',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'True',
            marks: 1
        },
        {
            partId: 5,
            questionNumber: 2,
            questionText: 'The albedo effect causes ice to melt faster in summer months.',
            questionType: 'true_false_not_given',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'False',
            marks: 1
        },
        {
            partId: 5,
            questionNumber: 3,
            questionText: 'Polar bears are the only Arctic animals affected by ice loss.',
            questionType: 'true_false_not_given',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'False',
            marks: 1
        },

        // Writing Test 1 Questions
        {
            partId: 7,
            questionNumber: 1,
            questionText: 'Describe the main trends shown in the bar chart about housing tenure in England and Wales.',
            questionType: 'descriptive_writing',
            options: null,
            correctAnswer: 'Sample answer focusing on the increase in owned accommodation and decrease in rented accommodation over the time period',
            marks: 4
        },
        {
            partId: 8,
            questionNumber: 1,
            questionText: 'Discuss whether university students should study subjects of their choice or only practical subjects. Give your opinion.',
            questionType: 'argumentative_essay',
            options: null,
            correctAnswer: 'Sample essay discussing both perspectives with clear introduction, body paragraphs, and conclusion',
            marks: 5
        },

        // Speaking Test 1 Questions
        {
            partId: 9,
            questionNumber: 1,
            questionText: 'Where do you come from?',
            questionType: 'personal_question',
            options: null,
            correctAnswer: 'Sample answer about hometown',
            marks: 1
        },
        {
            partId: 9,
            questionNumber: 2,
            questionText: 'Do you work or are you a student?',
            questionType: 'personal_question',
            options: null,
            correctAnswer: 'Sample answer about work or studies',
            marks: 1
        },
        {
            partId: 10,
            questionNumber: 1,
            questionText: 'Describe a piece of technology you find useful',
            questionType: 'cue_card',
            options: null,
            correctAnswer: 'Sample 2-minute response about smartphone/laptop with personal examples',
            marks: 3
        },
        {
            partId: 11,
            questionNumber: 1,
            questionText: 'How has technology changed education in your country?',
            questionType: 'discussion_question',
            options: null,
            correctAnswer: 'Sample answer discussing online learning, digital resources, and classroom technology',
            marks: 2
        }
    ];

    await db.insert(questions).values(questionsData);

    console.log('✅ IELTS tests seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});