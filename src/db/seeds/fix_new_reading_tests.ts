import { db } from '@/db';
import { testParts, questions } from '@/db/schema';

async function main() {
    // Query to find reading tests without parts (IDs 34-37)
    const readingTestIds = [34, 35, 36, 37];
    
    const testPartsData = [
        // Test 34 - Climate Science, Technology Innovation, Archaeological Discoveries
        {
            testId: 34,
            partNumber: 1,
            title: 'Climate Science: Understanding Global Temperature Changes',
            instructions: 'Questions 1-13. Read the passage and answer the questions below. Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
            content: `Climate Science: Understanding Global Temperature Changes

The Earth's climate system is extraordinarily complex, involving interactions between the atmosphere, oceans, land surfaces, and ice sheets. Over the past century, scientists have developed increasingly sophisticated methods to measure and understand global temperature changes, revealing patterns that have profound implications for our planet's future.

Temperature records from weather stations around the world show that global average temperatures have risen by approximately 1.1 degrees Celsius since the late 19th century. This warming has not been uniform across the globe or through time. The Arctic regions have experienced particularly dramatic warming, with some areas seeing temperature increases of more than 3 degrees Celsius. This phenomenon, known as Arctic amplification, occurs because as ice melts, darker surfaces are exposed that absorb more solar radiation than reflective white ice.

The measurement of global temperatures requires careful analysis of data from thousands of weather stations, ships, and satellites. Scientists must account for various factors that can influence temperature readings, including changes in measurement techniques, station relocations, and urban heat island effects. Despite these challenges, multiple independent research groups have reached consistent conclusions about the warming trend.

One of the most compelling pieces of evidence for recent climate change comes from ice core data. When snow falls and compresses into ice, it traps tiny bubbles of ancient atmosphere. By drilling deep into ice sheets in Greenland and Antarctica, scientists can extract cores that provide a record of atmospheric conditions going back hundreds of thousands of years. These ice cores reveal that current atmospheric carbon dioxide levels are higher than they have been for at least 800,000 years.

The relationship between greenhouse gases and global temperatures is well-established through both laboratory experiments and observations of planetary atmospheres. Carbon dioxide, methane, and other greenhouse gases trap heat in the atmosphere by absorbing infrared radiation that would otherwise escape to space. As concentrations of these gases increase, more heat is retained, leading to warming temperatures.

Modern climate models incorporate vast amounts of data about atmospheric physics, ocean currents, and land surface processes. These models have successfully reproduced observed temperature changes when human activities are included but fail to match observations when only natural factors are considered. This provides strong evidence that human activities are the primary driver of recent warming.

The consequences of rising temperatures extend far beyond simple changes in weather patterns. Warmer temperatures are causing ice sheets and glaciers to melt at accelerating rates, contributing to sea level rise. The thermal expansion of seawater as it warms also contributes to rising sea levels. Current projections suggest that global sea levels could rise by one to four feet by the end of this century, though the exact amount depends on future greenhouse gas emissions and the response of ice sheets.

Changes in precipitation patterns are another significant consequence of warming temperatures. As the atmosphere warms, it can hold more moisture, leading to more intense rainfall and flooding in some regions while causing prolonged droughts in others. These changes in the water cycle have profound implications for agriculture, water resources, and ecosystem health.

Ocean acidification, sometimes called the "other CO2 problem," occurs as the oceans absorb excess carbon dioxide from the atmosphere. When CO2 dissolves in seawater, it forms carbonic acid, making the oceans more acidic. This process threatens marine ecosystems, particularly organisms that build shells or skeletons from calcium carbonate, such as corals, shellfish, and some types of plankton.

The scientific consensus on climate change is remarkably strong, with over 97% of actively publishing climate scientists agreeing that recent warming is primarily caused by human activities. This consensus is based on multiple lines of evidence, including temperature records, ice core data, and our understanding of atmospheric physics. As research continues, scientists are working to refine their understanding of regional climate impacts and improve predictions of future changes.`
        },
        {
            testId: 34,
            partNumber: 2,
            title: 'Technology Innovation in the Digital Age',
            instructions: 'Questions 14-26. Choose the correct letter, A, B, C or D.',
            content: `Technology Innovation in the Digital Age

The rapid pace of technological innovation in the 21st century has fundamentally transformed how we live, work, and interact with the world around us. From artificial intelligence and machine learning to biotechnology and renewable energy systems, breakthrough technologies are reshaping entire industries and creating new possibilities that were once relegated to science fiction.

Artificial intelligence represents one of the most significant technological developments of our time. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions with remarkable accuracy. In healthcare, AI systems are being used to diagnose diseases, discover new drugs, and personalize treatment plans. In finance, algorithmic trading systems can execute thousands of transactions per second, while fraud detection systems protect consumers from cybercrime.

The development of AI has been accelerated by several key factors. The availability of massive datasets, often called "big data," provides the raw material that machine learning algorithms need to learn and improve. Advances in computer processing power, particularly the development of specialized chips called graphics processing units (GPUs), have made it possible to train complex neural networks in reasonable timeframes. Cloud computing platforms have democratized access to powerful computing resources, allowing researchers and companies of all sizes to experiment with AI technologies.

However, the rapid advancement of AI also raises important ethical and societal questions. Concerns about job displacement, privacy, and algorithmic bias have sparked debates about how these technologies should be developed and regulated. Some experts worry about the concentration of AI capabilities in the hands of a few large technology companies, while others advocate for more diverse and inclusive approaches to AI development.

Biotechnology represents another frontier of innovation with profound implications for human health and society. Gene editing technologies, such as CRISPR-Cas9, allow scientists to make precise changes to DNA with unprecedented accuracy and efficiency. These tools are being used to develop new treatments for genetic diseases, improve crop yields, and even attempt to bring extinct species back to life.

The Human Genome Project, completed in 2003, mapped the entire human genetic code and laid the foundation for personalized medicine. Today, genetic testing can reveal an individual's predisposition to certain diseases, allowing for early intervention and prevention strategies. Pharmacogenomics, the study of how genes affect drug responses, is enabling doctors to prescribe medications that are most likely to be effective for each patient while minimizing adverse reactions.

Renewable energy technologies have experienced dramatic improvements in efficiency and cost-effectiveness over the past decade. Solar photovoltaic panels have become approximately 90% cheaper since 2010, making solar energy competitive with fossil fuels in many parts of the world. Wind turbines have grown larger and more efficient, capable of generating electricity even in areas with moderate wind resources.

Energy storage systems, particularly lithium-ion batteries, have also seen significant advances. The development of electric vehicles has driven improvements in battery technology, leading to longer range and faster charging times. Grid-scale battery installations are beginning to address one of the main challenges of renewable energy: the intermittent nature of solar and wind power.

The Internet of Things (IoT) is connecting everyday objects to the internet, creating vast networks of interconnected devices that can collect and share data. Smart home systems can automatically adjust temperature and lighting based on occupancy patterns. In agriculture, IoT sensors can monitor soil moisture, temperature, and nutrient levels, enabling precision farming techniques that optimize crop yields while minimizing resource use.

Quantum computing represents a revolutionary approach to information processing that could solve certain types of problems exponentially faster than classical computers. While still in the early stages of development, quantum computers have the potential to transform fields such as cryptography, drug discovery, and climate modeling. Major technology companies and governments are investing billions of dollars in quantum research, recognizing its strategic importance.

The convergence of these various technologies is creating new possibilities and applications that would not be possible with any single technology alone. For example, AI-powered analysis of genetic data is accelerating drug discovery, while IoT sensors combined with machine learning are enabling predictive maintenance in manufacturing and infrastructure.

As we look to the future, the pace of technological innovation shows no signs of slowing. Emerging technologies such as brain-computer interfaces, synthetic biology, and advanced robotics promise to further transform our world. However, realizing the full potential of these technologies will require addressing challenges related to ethics, regulation, and ensuring that the benefits are broadly shared across society.`
        },
        {
            testId: 34,
            partNumber: 3,
            title: 'Archaeological Discoveries: Unveiling Ancient Civilizations',
            instructions: 'Questions 27-40. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            content: `Archaeological Discoveries: Unveiling Ancient Civilizations

Archaeological discoveries continue to reshape our understanding of human history, revealing the complexity and sophistication of ancient civilizations that flourished thousands of years ago. Recent excavations and advanced analytical techniques have uncovered evidence of advanced engineering, complex social structures, and remarkable artistic achievements that challenge previous assumptions about prehistoric and ancient societies.

One of the most significant archaeological discoveries of recent decades is the ancient city of Göbekli Tepe in southeastern Turkey. Dating back approximately 11,500 years, this site predates Stonehenge by roughly 6,000 years and contains the world's oldest known temple complex. The massive stone pillars, some weighing up to 16 tons, are decorated with intricate carvings of animals and abstract symbols. What makes Göbekli Tepe particularly remarkable is that it was built by hunter-gatherer societies before the development of agriculture, suggesting that complex religious and social organization may have preceded, rather than followed, the agricultural revolution.

The discovery has forced archaeologists to reconsider the traditional narrative of human civilization. Previously, it was believed that complex monumental architecture only emerged after societies had developed agriculture and settled in permanent communities. Göbekli Tepe demonstrates that hunter-gatherer groups were capable of organizing large-scale construction projects and maintaining sophisticated religious practices. Some researchers even suggest that the need to maintain and staff such temple complexes may have provided the impetus for developing agriculture.

In South America, recent discoveries at the Caral-Supe civilization in Peru have revealed one of the world's oldest urban centers. Dating to approximately 3500 BCE, Caral was contemporaneous with the Egyptian pyramids and predates the Maya civilization by over 2,000 years. The site contains large stone platforms, circular sunken courts, and residential areas that housed thousands of people. What makes Caral particularly intriguing is the absence of defensive walls or weapons, suggesting a remarkably peaceful society.

Archaeological evidence from Caral indicates a sophisticated understanding of engineering and astronomy. The city's layout appears to be aligned with astronomical events, and the construction techniques used in the monumental architecture demonstrate advanced knowledge of structural engineering. Excavations have also revealed evidence of long-distance trade networks, with artifacts made from materials sourced hundreds of miles away, indicating complex economic relationships between distant communities.

Advanced analytical techniques are revolutionizing archaeological research and enabling new discoveries. Ground-penetrating radar and LiDAR (Light Detection and Ranging) technology allow archaeologists to map underground structures and identify potential excavation sites without disturbing the soil. Satellite imagery has revealed hundreds of previously unknown archaeological sites, including lost cities hidden beneath jungle canopies and desert sands.

Radiocarbon dating and other chronometric techniques have become increasingly precise, allowing researchers to establish more accurate timelines for ancient civilizations. DNA analysis of ancient human remains is providing insights into migration patterns, population genetics, and the relationships between different ancient groups. Isotope analysis of bones and teeth can reveal information about ancient diets, migration patterns, and even seasonal movements of nomadic peoples.

The study of ancient DNA has yielded particularly exciting results in recent years. Genetic analysis of Neanderthal and Denisovan remains has shown that these extinct human species interbred with modern humans, contributing to the genetic diversity of contemporary populations. Ancient DNA studies have also traced the spread of agriculture across continents and revealed unexpected connections between geographically distant populations.

Underwater archaeology has opened entirely new frontiers for exploration. Advanced diving equipment and remotely operated vehicles have made it possible to explore shipwrecks and submerged settlements in unprecedented detail. The discovery of well-preserved organic materials in underwater sites has provided insights into ancient technologies, trade networks, and daily life that would be impossible to obtain from terrestrial sites.

The preservation conditions in underwater sites often result in the survival of materials that would have long since decomposed on land. Wooden ship hulls, leather goods, textiles, and even food remains can survive for thousands of years in the oxygen-poor environment of the seafloor. These materials provide direct evidence of ancient technologies and practices that can only be inferred from stone and ceramic artifacts found at terrestrial sites.

Climate change and human development pose significant threats to archaeological sites around the world. Rising sea levels, increased storm activity, and changing precipitation patterns are accelerating the erosion and destruction of coastal archaeological sites. Urban development and agricultural expansion continue to destroy sites before they can be properly studied. This has led to an increased emphasis on rescue archaeology and the development of rapid survey and documentation techniques.

Digital technologies are transforming how archaeological data is recorded, analyzed, and shared. Three-dimensional scanning and photogrammetry create detailed digital models of artifacts and sites that can be studied by researchers around the world. Virtual reality applications allow people to experience ancient sites and artifacts in ways that would be impossible in traditional museum settings. Online databases and digital archives are making archaeological data more accessible to researchers and the public.

The integration of multiple scientific disciplines has become essential for modern archaeological research. Collaborations between archaeologists, geneticists, climatologists, and computer scientists are yielding insights that would be impossible to achieve through traditional archaeological methods alone. This interdisciplinary approach is helping to create more complete and nuanced pictures of ancient societies and their relationships with their environments.`
        },

        // Test 35 - Renewable Energy, Psychology, Urban Planning
        {
            testId: 35,
            partNumber: 1,
            title: 'Renewable Energy: The Future of Power Generation',
            instructions: 'Questions 1-13. Do the following statements agree with the information given in the reading passage? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
            content: `Renewable Energy: The Future of Power Generation

The global transition to renewable energy sources represents one of the most significant technological and economic shifts of the 21st century. As concerns about climate change intensify and the costs of renewable technologies continue to fall, countries worldwide are investing heavily in solar, wind, hydroelectric, and other clean energy sources to reduce their dependence on fossil fuels and create more sustainable energy systems.

Solar photovoltaic technology has experienced remarkable growth and improvement over the past two decades. The cost of solar panels has decreased by more than 90% since 2010, making solar energy competitive with traditional fossil fuel sources in many regions. This dramatic cost reduction has been driven by improvements in manufacturing efficiency, technological advances in panel design, and economies of scale as production has increased globally.

Modern solar panels can convert approximately 20-22% of sunlight into electricity, a significant improvement from the 6% efficiency rates achieved by early photovoltaic cells in the 1950s. Research into new materials and cell designs continues to push efficiency rates higher, with laboratory demonstrations achieving conversion rates exceeding 40% under concentrated sunlight conditions.

Wind energy has also seen tremendous growth, becoming the fastest-growing source of electricity generation in many countries. Modern wind turbines are engineering marvels, with rotor diameters exceeding 150 meters and tower heights reaching over 100 meters. These massive structures can generate enough electricity to power thousands of homes, even in areas with moderate wind resources.

Offshore wind farms represent a particularly promising frontier for wind energy development. Ocean winds tend to be stronger and more consistent than onshore winds, allowing for higher capacity factors and greater electricity generation. However, offshore installations face unique challenges, including harsh marine environments, complex installation procedures, and higher maintenance costs due to their remote locations.

Hydroelectric power has long been a reliable source of renewable energy, particularly in regions with abundant water resources. Large-scale hydroelectric projects can generate enormous amounts of electricity and provide additional benefits such as flood control and water storage for irrigation. However, major dam projects can have significant environmental and social impacts, including the displacement of communities and disruption of river ecosystems.

Small-scale hydroelectric installations, often called run-of-river systems, offer a more environmentally friendly alternative to large dams. These systems generate electricity from flowing water without requiring large reservoirs, minimizing their impact on river ecosystems and surrounding communities. Micro-hydro systems can provide electricity to remote communities that are not connected to national power grids.

Energy storage represents one of the most critical challenges for renewable energy systems. Solar and wind power are intermittent sources, generating electricity only when the sun shines or the wind blows. Large-scale battery systems are being deployed to store excess energy during periods of high generation and release it when demand exceeds supply.

Lithium-ion batteries, which have benefited from rapid development driven by the electric vehicle industry, are currently the dominant technology for grid-scale energy storage. However, their high cost and limited lifespan present challenges for widespread deployment. Alternative storage technologies, including pumped hydro storage, compressed air energy storage, and advanced battery chemistries, are being developed to address these limitations.

Smart grid technologies are essential for integrating large amounts of renewable energy into existing electrical systems. Traditional power grids were designed around centralized power plants that could be controlled to match electricity supply with demand. Renewable energy sources are typically distributed across many locations and produce variable output, requiring more sophisticated control systems to maintain grid stability.

Advanced forecasting systems use weather data and machine learning algorithms to predict renewable energy output hours or days in advance. This information allows grid operators to better plan for periods of high or low renewable generation and coordinate with other power sources to maintain reliable electricity supply.

The economic benefits of renewable energy extend beyond simple cost comparisons with fossil fuels. Renewable energy projects create jobs in manufacturing, installation, and maintenance, often in rural areas that have been economically disadvantaged. Unlike fossil fuel power plants, renewable energy facilities do not require ongoing fuel purchases, providing protection against volatile commodity prices.

Government policies have played a crucial role in supporting renewable energy development. Feed-in tariffs, renewable portfolio standards, and tax incentives have helped create markets for clean energy technologies and encouraged private investment. As renewable technologies have matured and costs have fallen, many of these support mechanisms are being phased out or redesigned to focus on grid integration and storage.

International cooperation is essential for accelerating the global transition to renewable energy. Technology transfer, financing mechanisms, and capacity building programs help developing countries leapfrog older energy technologies and build modern, clean energy systems. The Paris Agreement on climate change has created a framework for countries to set renewable energy targets and coordinate their efforts to reduce greenhouse gas emissions.

The future of renewable energy looks increasingly bright as technologies continue to improve and costs continue to fall. Emerging technologies such as floating solar arrays, vertical axis wind turbines, and advanced geothermal systems promise to unlock new sources of clean energy. As storage technologies mature and smart grid systems become more sophisticated, renewable energy sources will play an increasingly dominant role in global electricity generation.`
        },
        {
            testId: 35,
            partNumber: 2,
            title: 'Psychology: Understanding Human Behavior and Mental Processes',
            instructions: 'Questions 14-26. Choose the correct letter, A, B, C or D.',
            content: `Psychology: Understanding Human Behavior and Mental Processes

Psychology, the scientific study of human behavior and mental processes, encompasses a vast array of topics ranging from basic cognitive functions to complex social interactions. Modern psychological research combines rigorous experimental methods with advanced neuroscience techniques to uncover the mechanisms underlying human thought, emotion, and behavior, providing insights that have practical applications in education, healthcare, business, and social policy.

Cognitive psychology focuses on mental processes such as perception, memory, learning, and decision-making. Research in this field has revealed that human memory is not like a video recording that perfectly preserves past experiences. Instead, memory is a constructive process where information is encoded, stored, and retrieved through complex neural networks. Each time we recall a memory, it can be modified by current knowledge and experiences, making memory both remarkably flexible and potentially unreliable.

The study of attention has shown that humans have limited cognitive resources and must selectively focus on certain information while filtering out distractions. Attention operates through multiple systems, including focused attention for concentrating on specific tasks, sustained attention for maintaining focus over time, and divided attention for multitasking. Research has demonstrated that multitasking often reduces performance efficiency, as the brain must constantly switch between different tasks rather than processing them simultaneously.

Social psychology examines how individuals think, feel, and behave in social contexts. One of the most influential concepts in social psychology is cognitive dissonance, which occurs when people hold contradictory beliefs or when their actions conflict with their values. To reduce this psychological discomfort, people often change their attitudes or rationalize their behavior, sometimes leading to unexpected outcomes in decision-making and attitude formation.

The study of social influence has identified several powerful mechanisms through which people affect each other's behavior. Conformity research, exemplified by Solomon Asch's famous line judgment experiments, demonstrates that people often go along with group opinions even when they privately disagree. Obedience studies, such as Stanley Milgram's controversial experiments, revealed that ordinary individuals might engage in harmful behavior when directed by authority figures.

Developmental psychology traces human psychological development from infancy through old age. Jean Piaget's theory of cognitive development identified distinct stages in children's thinking, from sensorimotor exploration in infancy to abstract reasoning in adolescence. However, modern research suggests that development is more continuous and variable than Piaget originally proposed, with significant individual differences in developmental trajectories.

Attachment theory, developed by John Bowlby and Mary Ainsworth, examines the emotional bonds between children and caregivers. Secure attachment, characterized by trust and comfort with caregivers, tends to promote positive social and emotional development. Insecure attachment patterns may lead to difficulties in relationships and emotional regulation, though these early experiences do not necessarily determine adult outcomes.

Personality psychology seeks to understand individual differences in characteristic patterns of thinking, feeling, and behaving. The Five-Factor Model, also known as the Big Five, identifies five broad dimensions of personality: openness to experience, conscientiousness, extraversion, agreeableness, and neuroticism. These traits show remarkable stability across the lifespan and predict various life outcomes, including academic achievement, job performance, and relationship satisfaction.

Research on personality development suggests that while basic temperamental traits may be largely inherited, personality continues to develop and change throughout life in response to experiences and social roles. Cultural factors also significantly influence personality expression, with different societies emphasizing and rewarding different personality characteristics.

Clinical psychology addresses mental health disorders and therapeutic interventions. The diagnostic and statistical manual of mental disorders provides standardized criteria for identifying psychological conditions, though diagnosis remains complex due to the overlap between different disorders and the dimensional nature of many psychological symptoms.

Cognitive-behavioral therapy, one of the most extensively researched therapeutic approaches, focuses on identifying and changing maladaptive thought patterns and behaviors. This approach has proven effective for treating various conditions, including depression, anxiety disorders, and post-traumatic stress disorder. However, therapy effectiveness depends on numerous factors, including the therapeutic relationship, client motivation, and the specific nature of the presenting problems.

Neuropsychology bridges psychology and neuroscience by studying how brain function relates to behavior and cognition. Advanced brain imaging techniques, such as functional magnetic resonance imaging and positron emission tomography, allow researchers to observe brain activity in real-time as people perform various tasks. This research has revealed that complex psychological functions involve networks of brain regions working together rather than being localized to specific areas.

Studies of brain plasticity have shown that the brain continues to change throughout life in response to experience and learning. This plasticity enables recovery from brain injury and suggests that targeted interventions can potentially modify brain function to improve psychological well-being and cognitive performance.

Positive psychology, a relatively recent movement within the field, focuses on human strengths and factors that contribute to well-being and flourishing. Research in this area examines concepts such as happiness, life satisfaction, resilience, and personal growth. Findings suggest that well-being involves multiple components, including positive emotions, engagement in meaningful activities, positive relationships, and a sense of accomplishment.

The application of psychological research extends far beyond clinical settings. Educational psychology applies psychological principles to improve learning and teaching methods. Organizational psychology examines workplace behavior and helps design more effective and satisfying work environments. Health psychology investigates the psychological factors that influence physical health and develops interventions to promote healthy behaviors.`
        },
        {
            testId: 35,
            partNumber: 3,
            title: 'Urban Planning: Creating Sustainable Cities for the Future',
            instructions: 'Questions 27-40. Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            content: `Urban Planning: Creating Sustainable Cities for the Future

Urban planning has evolved dramatically over the past century, transitioning from primarily aesthetic and engineering concerns to a comprehensive approach that addresses environmental sustainability, social equity, and economic development. Modern urban planners must balance competing demands while creating cities that can accommodate growing populations, reduce environmental impacts, and provide high quality of life for all residents.

The concept of sustainable urban development recognizes that cities are complex systems where transportation, housing, energy, water, and waste management are interconnected. Traditional planning approaches often addressed these elements separately, leading to inefficient and unsustainable urban forms. Contemporary planning emphasizes integrated solutions that optimize multiple urban systems simultaneously.

Transit-oriented development represents one of the most influential concepts in modern urban planning. This approach concentrates high-density residential and commercial development around public transportation nodes, reducing car dependency and creating walkable neighborhoods. Research has shown that residents of transit-oriented communities drive significantly less, walk more, and have lower transportation costs compared to those living in car-dependent suburban areas.

The design of transit-oriented developments typically includes mixed-use buildings that combine residential, office, and retail spaces within walking distance of transit stations. This arrangement reduces the need for automobile trips by allowing residents to access jobs, services, and amenities without driving. Successful examples include neighborhoods built around light rail stations in cities like Portland, Oregon, and Copenhagen, Denmark.

Green infrastructure has emerged as an essential component of sustainable urban planning. Unlike traditional "gray" infrastructure that relies on engineered systems to manage stormwater, green infrastructure uses natural processes to absorb rainwater, reduce urban heat islands, and improve air quality. Examples include green roofs, permeable pavements, constructed wetlands, and urban forests.

Urban heat islands, where cities experience significantly higher temperatures than surrounding rural areas, pose serious challenges for public health and energy consumption. Dark surfaces like asphalt and concrete absorb solar radiation during the day and release heat at night, creating temperature differences that can exceed 5 degrees Celsius. Green infrastructure helps mitigate this effect by providing shade, evapotranspiration, and reflective surfaces.

The 15-minute city concept has gained considerable attention among urban planners and policymakers. This model envisions neighborhoods where residents can access most daily needs within a 15-minute walk or bike ride from their homes. Implementing this concept requires careful attention to land use mixing, density patterns, and the distribution of services and amenities throughout the urban area.

Affordable housing remains one of the most persistent challenges in urban planning. As cities grow and property values increase, low and moderate-income residents are often displaced to peripheral areas with limited access to jobs and services. Inclusionary zoning policies require or incentivize developers to include affordable units in new residential projects, helping to maintain economic diversity in gentrifying neighborhoods.

Community land trusts offer an innovative approach to maintaining long-term housing affordability. In this model, a nonprofit organization owns land and leases it to residents who own their homes but not the underlying property. This arrangement keeps housing costs stable while allowing residents to build equity and maintain community control over development decisions.

Participatory planning processes have become increasingly important for ensuring that urban development serves the needs of existing communities. Traditional top-down planning approaches often failed to consider local knowledge and priorities, leading to projects that disrupted established social networks and economic activities. Modern planning emphasizes community engagement and collaborative decision-making throughout the planning process.

Digital technologies are transforming how cities collect data, engage citizens, and manage urban systems. Geographic information systems allow planners to analyze complex spatial relationships and model the impacts of proposed developments. Online platforms enable broader public participation in planning processes, though digital divides can exclude some community members from these opportunities.

Smart city initiatives integrate sensors, data analytics, and automated systems to optimize urban operations and services. Examples include adaptive traffic signal systems that respond to real-time traffic conditions, smart parking systems that guide drivers to available spaces, and energy management systems that optimize building performance. However, concerns about privacy, surveillance, and corporate control have led to debates about the appropriate role of technology in urban governance.

Climate change adaptation has become a central concern for urban planners as cities face increasing risks from extreme weather events, sea level rise, and changing precipitation patterns. Resilient urban design incorporates features that help cities withstand and recover from climate-related disruptions, such as flood-resistant building techniques, redundant infrastructure systems, and emergency evacuation routes.

Coastal cities face particular challenges from sea level rise and increased storm surge risks. Adaptation strategies include constructed barriers, beach nourishment projects, and managed retreat from the most vulnerable areas. Some cities are experimenting with floating neighborhoods and amphibious architecture that can adapt to changing water levels.

The COVID-19 pandemic has highlighted the importance of public space and neighborhood-scale amenities in urban life. Temporary street closures for outdoor dining and recreation demonstrated the potential for more flexible use of urban space. Many cities are now considering permanent changes to street design and land use regulations to support outdoor activities and reduce crowding in indoor spaces.

Future urban planning will likely emphasize greater flexibility and adaptability as cities face rapid technological change, demographic shifts, and environmental challenges. Modular construction techniques, temporary use permits, and adaptive reuse of existing buildings may become more common as cities seek to accommodate changing needs without extensive demolition and reconstruction.`
        },

        // Test 36 - Marine Biology, Digital Technology, Cultural Studies
        {
            testId: 36,
            partNumber: 1,
            title: 'Marine Biology: Exploring Ocean Ecosystems',
            instructions: 'Questions 1-13. Read the passage and answer the questions below. Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
            content: `Marine Biology: Exploring Ocean Ecosystems

The world's oceans contain some of the most diverse and complex ecosystems on Earth, harboring millions of species from microscopic plankton to massive whales. Marine biologists study these interconnected systems to understand how ocean life functions, responds to environmental changes, and contributes to global ecological processes. Recent advances in underwater technology and molecular biology have revolutionized our understanding of marine ecosystems and revealed previously unknown aspects of ocean life.

Coral reefs represent one of the most biodiverse ecosystems on the planet, supporting approximately 25% of all marine species despite covering less than 1% of the ocean floor. These underwater cities are built by tiny animals called coral polyps, which secrete calcium carbonate skeletons that accumulate over thousands of years to form massive reef structures. The polyps have a symbiotic relationship with microscopic algae called zooxanthellae, which live within their tissues and provide energy through photosynthesis.

The health of coral reefs depends on precise environmental conditions, particularly water temperature, acidity, and clarity. Rising ocean temperatures due to climate change have triggered widespread coral bleaching events, where stressed corals expel their zooxanthellae partners, leaving behind white calcium carbonate skeletons. If temperature stress persists, the corals die, leading to the collapse of entire reef ecosystems and the loss of the countless species that depend on them.

Ocean acidification, caused by the absorption of excess atmospheric carbon dioxide, poses another serious threat to marine life. As seawater becomes more acidic, it becomes more difficult for organisms like corals, shellfish, and certain types of plankton to build and maintain their calcium carbonate shells and skeletons. This process has been called the "other CO2 problem" and could have cascading effects throughout marine food webs.

Deep-sea ecosystems, once thought to be biological deserts, have proven to be remarkably diverse and productive. Hydrothermal vents, discovered only in 1977, support unique communities of organisms that derive energy from chemical processes rather than sunlight. Giant tube worms, vent crabs, and specialized bacteria thrive in these extreme environments, where temperatures can exceed 400 degrees Celsius and toxic chemicals are abundant.

The food webs around hydrothermal vents operate on entirely different principles from surface ocean ecosystems. Instead of photosynthesis, chemosynthetic bacteria form the base of the food chain by converting chemicals like hydrogen sulfide into organic compounds. These bacteria either live freely in the water or form symbiotic relationships with larger organisms, providing them with nutrition in environments where traditional food sources are absent.

Marine mammals demonstrate remarkable adaptations to life in aquatic environments. Whales, dolphins, and seals have evolved specialized features for diving, navigation, and communication in the ocean. Sperm whales can dive to depths exceeding 2,000 meters and hold their breath for over an hour while hunting for squid in the deep ocean. Their echolocation abilities allow them to navigate and hunt in complete darkness using sophisticated biosonar systems.

Migration patterns of marine animals span entire ocean basins and connect ecosystems across vast distances. Arctic terns undertake the longest migration of any animal, traveling roughly 70,000 kilometers annually from Arctic to Antarctic and back. These epic journeys require precise navigation abilities and timing to take advantage of seasonal food resources and breeding conditions.

Plankton, despite their microscopic size, play crucial roles in ocean ecosystems and global climate regulation. Phytoplankton, tiny marine plants, conduct approximately half of the world's photosynthesis and form the base of most marine food webs. Zooplankton, small animals that feed on phytoplankton, transfer energy up the food chain to fish, seabirds, and marine mammals.

The vertical migration of zooplankton represents one of the largest daily movements of biomass on Earth. Each night, billions of small animals rise from the deep ocean to feed on phytoplankton near the surface, then descend back to deeper waters before dawn to avoid predators. This massive daily migration transports nutrients and carbon between different ocean layers, influencing global biogeochemical cycles.

Advances in marine technology have opened new frontiers for biological research. Remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs) can explore depths and environments that are inaccessible to human divers. These sophisticated machines are equipped with high-definition cameras, sampling equipment, and scientific instruments that allow researchers to study deep-sea organisms in their natural habitats.

Environmental DNA (eDNA) analysis has revolutionized marine biodiversity studies. By collecting water samples and analyzing the genetic material shed by organisms, scientists can identify species present in an area without actually capturing them. This technique has revealed hidden biodiversity and allowed researchers to monitor ecosystem changes over time with minimal environmental impact.

Satellite technology enables scientists to monitor ocean conditions and marine life on a global scale. Satellite sensors can detect phytoplankton concentrations, sea surface temperatures, and even track the movements of large marine animals equipped with satellite tags. This bird's-eye view of ocean systems has revealed connections between distant marine ecosystems and helped identify critical habitats for conservation.

Marine protected areas (MPAs) have become essential tools for conserving ocean biodiversity and allowing depleted ecosystems to recover. Well-designed MPAs can increase fish populations, restore habitat complexity, and preserve critical breeding and feeding areas. However, the effectiveness of MPAs depends on proper design, enforcement, and integration with broader ecosystem management approaches.

Climate change is altering ocean ecosystems in complex and often unpredictable ways. Shifting currents, changing temperature patterns, and altered precipitation regimes are redistributing marine species and disrupting established ecological relationships. Some species are moving toward the poles as their preferred temperature ranges shift, while others face local extinction if they cannot adapt or relocate.

The study of marine biology continues to reveal new aspects of ocean life and its connections to global environmental systems. As human activities increasingly impact marine ecosystems, understanding these complex systems becomes ever more critical for developing effective conservation strategies and maintaining the health of our planet's oceans.`
        },
        {
            testId: 36,
            partNumber: 2,
            title: 'Digital Technology: Transforming Modern Society',
            instructions: 'Questions 14-26. Choose the correct letter, A, B, C or D.',
            content: `Digital Technology: Transforming Modern Society

The digital revolution has fundamentally transformed virtually every aspect of modern life, reshaping how we communicate, work, learn, and entertain ourselves. The convergence of computing power, internet connectivity, and mobile devices has created unprecedented opportunities for innovation and human connection, while simultaneously raising new challenges related to privacy, security, and social inequality.

The development of the internet represents one of the most significant technological achievements in human history. What began as a research project funded by the U.S. Department of Defense has evolved into a global network connecting billions of devices and enabling instant communication across vast distances. The World Wide Web, invented by Tim Berners-Lee in 1989, provided an intuitive interface for accessing information and services online, making the internet accessible to ordinary users rather than just technical specialists.

Social media platforms have revolutionized human communication and social interaction. These platforms enable people to maintain relationships across geographic boundaries, organize social movements, and share information and experiences with global audiences. However, the same technologies that connect people can also facilitate the spread of misinformation, create echo chambers that reinforce existing beliefs, and contribute to social polarization.

The rise of smartphones has put powerful computing capabilities in the hands of billions of people worldwide. These devices combine multiple functions that previously required separate devices: telephone, camera, music player, navigation system, and internet terminal. The app ecosystem has created new industries and business models, enabling entrepreneurs to reach global markets and users to access services ranging from transportation to food delivery with a few taps on their screens.

Artificial intelligence and machine learning are increasingly integrated into digital technologies, enabling systems to learn from experience and make decisions with minimal human intervention. Virtual assistants can understand natural language commands and provide personalized responses. Recommendation algorithms analyze user behavior to suggest content, products, and connections. Autonomous vehicles use AI systems to navigate complex traffic environments and make split-second driving decisions.

The collection and analysis of big data have transformed business operations and scientific research. Organizations can now gather and process vast amounts of information about customer behavior, market trends, and operational efficiency. This data-driven approach enables more precise decision-making and personalized services, but also raises concerns about privacy and the potential for discrimination based on algorithmic bias.

Cloud computing has fundamentally changed how software and data storage services are delivered and consumed. Instead of purchasing and maintaining expensive hardware and software, users can access computing resources on demand through internet connections. This model has reduced barriers to entry for technology startups and enabled organizations of all sizes to access enterprise-level computing capabilities.

The Internet of Things (IoT) is connecting everyday objects to the internet, creating networks of smart devices that can collect data, communicate with each other, and respond to environmental conditions. Smart home systems can automatically adjust temperature and lighting based on occupancy patterns and user preferences. Industrial IoT applications monitor equipment performance and predict maintenance needs, reducing downtime and operational costs.

Digital transformation has disrupted traditional business models across many industries. Streaming services have largely replaced physical media for music and video consumption. E-commerce platforms compete directly with brick-and-mortar retailers. Ride-sharing services challenge traditional taxi and transportation companies. These changes have created new opportunities for entrepreneurs and consumers while displacing workers in traditional industries.

The COVID-19 pandemic accelerated digital adoption across many sectors that had previously been slow to embrace technology. Remote work became mainstream, with video conferencing and collaboration tools enabling distributed teams to maintain productivity. Online education platforms provided continuity for students when schools closed. Telemedicine services expanded access to healthcare while reducing virus transmission risks.

Cybersecurity has become a critical concern as digital systems become more pervasive and interconnected. Cyberattacks can disrupt essential services, steal sensitive information, and cause billions of dollars in economic damage. Organizations must implement comprehensive security measures and maintain constant vigilance against evolving threats. The shortage of cybersecurity professionals has created challenges for many organizations seeking to protect their digital assets.

Digital privacy has become increasingly complex as technologies collect vast amounts of personal information. Location data, browsing habits, purchase history, and social connections create detailed profiles of individual users. While this information enables personalized services and targeted advertising, it also raises concerns about surveillance, manipulation, and the potential for misuse by governments and corporations.

The digital divide refers to disparities in access to digital technologies and the skills needed to use them effectively. Rural communities, low-income households, and elderly populations often have limited access to high-speed internet and modern devices. These disparities can exacerbate existing inequalities by limiting access to educational opportunities, employment prospects, and essential services that are increasingly delivered through digital channels.

Blockchain technology promises to enable new forms of digital transactions and record-keeping without requiring trusted intermediaries. Cryptocurrencies represent the most visible application of blockchain technology, enabling peer-to-peer financial transactions without traditional banking institutions. However, blockchain applications extend beyond finance to areas such as supply chain management, digital identity verification, and smart contracts.

The future of digital technology is likely to be shaped by emerging trends such as quantum computing, augmented reality, and advanced robotics. Quantum computers could solve certain types of problems exponentially faster than classical computers, potentially revolutionizing fields such as cryptography and drug discovery. Augmented reality technologies could overlay digital information onto the physical world, creating new interfaces for work, education, and entertainment.

As digital technologies continue to evolve, society must grapple with questions about their appropriate use and regulation. Balancing innovation with privacy protection, ensuring equitable access to digital opportunities, and managing the social impacts of technological change will require ongoing collaboration between technologists, policymakers, and civil society organizations.`
        },
        {
            testId: 36,
            partNumber: 3,
            title: 'Cultural Studies: Understanding Human Societies and Traditions',
            instructions: 'Questions 27-40. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            content: `Cultural Studies: Understanding Human Societies and Traditions

Cultural studies examines the complex ways in which human societies create meaning, express identity, and transmit knowledge across generations. This interdisciplinary field draws on anthropology, sociology, history, and literary criticism to understand how cultural practices, beliefs, and artistic expressions both reflect and shape social reality. Contemporary cultural studies pays particular attention to issues of power, identity, and globalization in shaping cultural experiences.

Language serves as one of the most fundamental aspects of cultural identity and social organization. Beyond its basic function as a communication tool, language embodies worldviews, encodes cultural knowledge, and establishes social relationships. The structure of language influences how speakers perceive and categorize reality, a concept known as linguistic relativity. For example, some languages have multiple words for concepts that other languages express with single terms, reflecting different cultural emphases and ways of understanding the world.

Indigenous languages around the world are disappearing at an alarming rate, with linguists estimating that half of the world's approximately 7,000 languages may become extinct within the next century. Language death typically occurs when younger generations abandon their ancestral language in favor of dominant languages that offer greater economic and social opportunities. The loss of indigenous languages represents not just linguistic diversity, but also the disappearance of unique cultural knowledge systems, oral histories, and ways of understanding the relationship between humans and the natural world.

Ritual and ceremony play crucial roles in maintaining cultural continuity and social cohesion. These formalized behaviors mark important life transitions, seasonal changes, and community celebrations. Anthropologists have identified common elements across many ritual traditions, including the use of symbols, repetitive actions, and prescribed sequences of events. Rituals often involve liminal spaces and times that exist outside ordinary social rules, allowing communities to explore alternative possibilities and reinforce shared values.

Rites of passage represent a particular category of ritual that helps individuals and communities navigate major life transitions. Arnold van Gennep's classic analysis identified three phases in rites of passage: separation from the previous state, a transitional period of ambiguity and transformation, and reincorporation into society with a new status. Examples include coming-of-age ceremonies, wedding rituals, and funeral practices that help communities process change and maintain social stability.

Material culture encompasses the physical objects that societies create and use to express cultural values and meet practical needs. Archaeological evidence demonstrates that humans have been creating sophisticated material culture for tens of thousands of years, from decorated cave paintings to intricately crafted tools and ornaments. The study of material culture reveals information about technological capabilities, artistic sensibilities, trade relationships, and social hierarchies.

Contemporary consumer culture represents a particular form of material culture where the acquisition and display of goods serves as a means of communication and identity formation. People use consumption choices to signal group membership, personal values, and social status. However, consumer culture also raises questions about sustainability, inequality, and the commodification of human relationships and experiences.

Globalization has created unprecedented levels of cultural contact and exchange, leading to both homogenization and hybridization of cultural practices. Dominant cultures, particularly those associated with economically powerful nations, spread through media, migration, and commerce, sometimes overwhelming local traditions. However, globalization also creates opportunities for cultural fusion and innovation as different traditions encounter and influence each other.

The concept of cultural imperialism describes situations where powerful cultures dominate and marginalize less powerful ones, often through economic pressure, political control, or media influence. Critics argue that globalization has led to the worldwide spread of Western, particularly American, cultural values and practices at the expense of local traditions. However, scholars have also noted that local communities often adapt global influences to fit their own cultural contexts rather than passively accepting foreign impositions.

Digital technologies have fundamentally altered how cultures are created, transmitted, and experienced. Social media platforms enable rapid sharing of cultural content across geographic boundaries, allowing local traditions to gain global audiences while also exposing communities to foreign influences. Online communities can maintain cultural connections among diaspora populations and preserve cultural knowledge through digital archives and virtual museums.

The democratization of media production through digital technologies has enabled marginalized communities to represent themselves and challenge dominant cultural narratives. Independent content creators can reach global audiences without traditional gatekeepers, providing platforms for diverse voices and perspectives. However, digital divides and algorithmic bias can also perpetuate existing inequalities in cultural representation and access.

Cultural preservation efforts have become increasingly important as globalization and modernization threaten traditional practices and knowledge systems. UNESCO's Intangible Cultural Heritage program recognizes and supports traditional practices such as oral traditions, performing arts, and craftsmanship that embody cultural knowledge and identity. However, preservation efforts must balance maintaining authenticity with allowing cultures to evolve and adapt to contemporary circumstances.

Museums and cultural institutions play important roles in preserving and interpreting cultural heritage, though their practices have been subject to increasing scrutiny and debate. Historical collecting practices often involved the removal of cultural objects from their original contexts, sometimes without the consent of source communities. Contemporary museum practice emphasizes collaboration with origin communities, repatriation of cultural objects, and more inclusive approaches to cultural interpretation.

Identity formation in contemporary societies involves complex negotiations between individual agency and social structures. People construct identities through their relationships to various cultural categories such as ethnicity, nationality, religion, gender, and social class. These identities are not fixed but rather emerge through ongoing social interactions and can change over time and across different social contexts.

Intersectionality theory, developed primarily by scholars of color, examines how multiple identity categories interact to create unique experiences of privilege and marginalization. This framework recognizes that individuals simultaneously occupy multiple social positions and that these intersecting identities cannot be understood through simple addition of separate categories. Intersectional analysis has become essential for understanding contemporary cultural dynamics and social justice issues.

The future of cultural studies faces challenges and opportunities related to technological change, environmental crisis, and social transformation. Researchers must develop new methods for studying digital cultures, virtual communities, and transnational cultural flows. Climate change and environmental degradation threaten many traditional ways of life, requiring urgent attention to how communities adapt their cultural practices to changing environmental conditions.`
        },

        // Test 37 - Space Exploration, Social Media, Environmental Conservation
        {
            testId: 37,
            partNumber: 1,
            title: 'Space Exploration: Pushing the Boundaries of Human Knowledge',
            instructions: 'Questions 1-13. Do the following statements agree with the information given in the reading passage? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
            content: `Space Exploration: Pushing the Boundaries of Human Knowledge

Space exploration represents humanity's greatest adventure, pushing the boundaries of scientific knowledge and technological capability while inspiring generations to look beyond Earth toward the cosmos. From the first artificial satellites to Mars rovers and deep space telescopes, space missions have revolutionized our understanding of the universe and our place within it, while driving innovations that benefit life on Earth.

The Space Race of the 1960s marked the beginning of the modern era of space exploration, driven by geopolitical competition between the United States and the Soviet Union. The Soviet Union achieved several early milestones, including the first artificial satellite (Sputnik 1 in 1957) and the first human in space (Yuri Gagarin in 1961). The United States responded with the ambitious Apollo program, which successfully landed twelve astronauts on the Moon between 1969 and 1972.

The Apollo missions demonstrated that humans could survive and work in the hostile environment of space, paving the way for future long-duration missions. The technological achievements required for lunar missions led to numerous innovations, including miniaturized computers, advanced materials, and life support systems. Many of these technologies found applications in civilian sectors, contributing to advances in computing, telecommunications, and medical devices.

Robotic missions have proven to be highly effective for exploring distant planets and moons where human missions would be prohibitively expensive or dangerous. The Voyager spacecraft, launched in 1977, have provided unprecedented insights into the outer solar system and continue to transmit data from interstellar space more than four decades after launch. Mars rovers, beginning with Sojourner in 1997 and continuing through current missions like Perseverance, have revealed evidence of past water activity and potentially habitable conditions on the Red Planet.

The Hubble Space Telescope, deployed in 1990, has transformed our understanding of the universe by providing clear images and data from beyond Earth's atmosphere. Free from atmospheric distortion, Hubble has captured stunning images of distant galaxies, nebulae, and stellar phenomena while contributing to major discoveries about the age and expansion rate of the universe. The telescope has also detected exoplanets orbiting other stars, opening new avenues for astrobiology research.

The International Space Station (ISS) represents one of humanity's greatest cooperative achievements, bringing together former adversaries and multiple nations in a shared scientific endeavor. Continuously occupied since 2000, the ISS serves as a laboratory for scientific research in microgravity conditions, enabling experiments that would be impossible on Earth. Research conducted on the ISS has advanced our understanding of protein crystallization, fluid physics, and the effects of prolonged spaceflight on human physiology.

Commercial space companies have emerged as major players in space exploration, reducing costs and increasing access to space. SpaceX has revolutionized rocket design with reusable launch vehicles that significantly reduce the cost of reaching orbit. Private companies are now routinely launching satellites, resupplying the ISS, and even carrying astronauts to space, demonstrating that space exploration need not be the exclusive domain of government agencies.

The search for extraterrestrial life represents one of the most compelling aspects of space exploration. The discovery of extremophile organisms on Earth living in conditions previously thought uninhabitable has expanded the potential habitable zone around stars and increased optimism about finding life elsewhere. Mars missions have focused on identifying past or present signs of microbial life, while missions to Jupiter's moon Europa and Saturn's moon Enceladus seek to explore subsurface oceans that might harbor life.

Astrobiology combines multiple scientific disciplines to study the potential for life beyond Earth. This field examines how life might arise and evolve under different planetary conditions, what signatures of life might be detectable from space, and how we might recognize alien life forms that could be fundamentally different from Earth-based organisms. The James Webb Space Telescope and other advanced instruments are beginning to analyze the atmospheres of exoplanets for potential biosignatures.

Space exploration faces significant challenges related to the harsh environment of space and the vast distances involved. Radiation exposure poses serious health risks for astronauts on long-duration missions, particularly those traveling beyond Earth's protective magnetosphere. The psychological challenges of isolation and confinement during extended space missions require careful consideration and preparation for future deep space exploration.

Technological limitations currently restrict human space exploration to relatively nearby destinations within the solar system. The journey to Mars takes approximately six to nine months with current propulsion technology, while reaching the outer planets would require years or decades. Advanced propulsion systems, such as ion drives or nuclear rockets, could reduce travel times but require significant technological development and testing.

Space debris represents a growing hazard for current and future space missions. Thousands of pieces of defunct satellites, rocket stages, and other debris orbit Earth at high velocities, posing collision risks for operational spacecraft. The Kessler Syndrome, a theoretical scenario where cascading collisions create increasing amounts of debris, could potentially make certain orbital regions unusable for future missions.

International cooperation has become increasingly important for ambitious space exploration projects that exceed the capabilities and resources of any single nation. The success of the ISS has demonstrated the potential for collaborative efforts, while new partnerships are forming for lunar exploration and Mars missions. However, geopolitical tensions and export control regulations can complicate international space cooperation.

The future of space exploration may include permanent human settlements on other worlds, asteroid mining operations, and interstellar missions to nearby star systems. These ambitious goals will require breakthrough technologies, enormous financial investments, and unprecedented international cooperation. Success will depend on continued public support for space exploration and the ability to demonstrate tangible benefits for life on Earth.

Climate monitoring satellites have become essential tools for understanding and addressing environmental challenges on Earth. These spacecraft provide global data on atmospheric composition, ocean temperatures, ice coverage, and deforestation rates that are crucial for climate science research and environmental policy decisions. Space-based observations offer the only practical means of monitoring environmental changes on a planetary scale.

Space exploration continues to inspire new generations of scientists, engineers, and explorers while demonstrating humanity's capacity for cooperation and achievement. The images and discoveries from space missions capture public imagination and foster interest in science and technology education. As we face global challenges such as climate change and resource scarcity, the perspective gained from space exploration reminds us of our planet's fragility and the importance of working together to protect our shared home.`
        },
        {
            testId: 37,
            partNumber: 2,
            title: 'Social Media: Transforming Communication and Society',
            instructions: 'Questions 14-26. Choose the correct letter, A, B, C or D.',
            content: `Social Media: Transforming Communication and Society

Social media platforms have fundamentally transformed how people communicate, share information, and build relationships in the digital age. These technologies enable instant global communication, democratic participation in public discourse, and new forms of creative expression, while simultaneously raising concerns about privacy, misinformation, and the psychological effects of constant connectivity.

The evolution of social media began with early online communities and bulletin board systems in the 1980s and 1990s, but the modern era of social networking started with platforms like Friendster and MySpace in the early 2000s. Facebook, launched in 2004, popularized the concept of maintaining detailed personal profiles and connecting with friends and acquaintances through a central platform. Twitter introduced the concept of microblogging, enabling users to share brief messages with followers in real-time.

Social media platforms have democratized content creation and distribution, enabling ordinary individuals to reach global audiences that were previously accessible only to professional media organizations. YouTube allows anyone to become a video content creator, while Instagram and TikTok have created new forms of visual and creative expression. This democratization has led to the emergence of influencer culture, where individuals can build substantial followings and monetize their content through advertising and sponsorships.

The rise of user-generated content has disrupted traditional media business models and challenged established gatekeepers of information. News organizations now compete with individual content creators and citizen journalists who can break stories and provide commentary without editorial oversight. While this has increased diversity of voices and perspectives in media, it has also contributed to the spread of misinformation and conspiracy theories.

Social media algorithms play a crucial role in determining what content users see and engage with on platforms. These systems analyze user behavior, preferences, and social connections to curate personalized feeds designed to maximize engagement and time spent on the platform. However, algorithmic curation can create filter bubbles that reinforce existing beliefs and limit exposure to diverse perspectives, potentially contributing to political polarization and social fragmentation.

The attention economy that drives social media platforms relies on capturing and maintaining user engagement through various psychological mechanisms. Features such as infinite scroll, push notifications, and variable reward schedules are designed to encourage frequent platform use and can contribute to addictive behaviors. Research has linked excessive social media use to anxiety, depression, and sleep disruption, particularly among young people.

Social movements have leveraged social media platforms to organize collective action and raise awareness about social and political issues. The Arab Spring demonstrations, #MeToo movement, and Black Lives Matter protests all utilized social media to coordinate activities, share information, and build support for their causes. These platforms can enable rapid mobilization and help marginalized voices reach wider audiences, though they can also be used to spread disinformation and organize harmful activities.

Privacy concerns have become increasingly prominent as social media platforms collect vast amounts of personal data about their users. This information includes not only explicitly shared content but also behavioral data such as browsing habits, location information, and social connections. Companies use this data to target advertising and improve their services, but data breaches and misuse have raised concerns about surveillance and manipulation.

The global reach of major social media platforms has created challenges for content moderation and governance. Platforms must balance free expression with the need to remove harmful content such as hate speech, misinformation, and threats of violence. Different cultural norms and legal frameworks across countries complicate these decisions, and automated content moderation systems often struggle with context and nuance.

Cyberbullying and online harassment have emerged as serious problems on social media platforms, particularly affecting young people. The anonymity and distance provided by digital communication can reduce empathy and increase aggressive behavior. Victims of online harassment may experience psychological trauma, social isolation, and in extreme cases, self-harm. Platforms have implemented various tools and policies to address these issues, but enforcement remains challenging.

The COVID-19 pandemic accelerated social media adoption and highlighted both the benefits and risks of these platforms. Social media enabled people to maintain social connections during lockdowns and provided channels for sharing public health information. However, the pandemic also saw the rapid spread of health misinformation and conspiracy theories that potentially undermined public health efforts.

Social media has transformed political communication and civic engagement, enabling direct communication between politicians and constituents while providing new channels for political organizing and advocacy. However, the same features that democratize political participation can also be exploited for electoral manipulation, foreign interference, and the spread of political disinformation. The 2016 U.S. presidential election highlighted vulnerabilities in social media systems to foreign influence operations.

The mental health implications of social media use have become a growing concern for researchers and policymakers. Studies have found correlations between heavy social media use and increased rates of anxiety, depression, and body image issues, particularly among adolescents. The constant social comparison enabled by these platforms can negatively impact self-esteem and psychological well-being, though the causal relationships remain complex and contested.

Economic impacts of social media extend beyond the platforms themselves to affect various industries and labor markets. The rise of influencer marketing has created new career paths while disrupting traditional advertising models. Small businesses can now reach customers directly through social media marketing, but they also face increased competition and pressure to maintain active online presences.

Digital literacy has become essential for navigating social media environments safely and effectively. Users need skills to evaluate information credibility, understand privacy implications, and recognize manipulative techniques used by malicious actors. Educational institutions and policymakers are developing programs to improve digital literacy, but keeping pace with rapidly evolving technologies and tactics remains challenging.

The future of social media is likely to be shaped by emerging technologies such as virtual reality, augmented reality, and artificial intelligence. Virtual social spaces could provide more immersive forms of online interaction, while AI systems may enable more sophisticated content creation and curation. However, these advances also raise new questions about authenticity, privacy, and the blurring of boundaries between digital and physical reality.

Regulatory responses to social media platforms vary significantly across different countries and regions. The European Union has implemented comprehensive data protection regulations and is developing new rules for digital platforms. Some countries have restricted or banned certain platforms entirely, while others have focused on industry self-regulation. The challenge lies in balancing innovation with protection of user rights and democratic values.`
        },
        {
            testId: 37,
            partNumber: 3,
            title: 'Environmental Conservation: Protecting Earth\'s Natural Heritage',
            instructions: 'Questions 27-40. Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
            content: `Environmental Conservation: Protecting Earth's Natural Heritage

Environmental conservation has emerged as one of the most critical challenges of the 21st century, as human activities increasingly threaten the delicate balance of natural ecosystems that support all life on Earth. The field encompasses diverse approaches to protecting biodiversity, managing natural resources sustainably, and addressing the interconnected threats of climate change, habitat destruction, and species extinction.

Biodiversity conservation focuses on protecting the variety of life forms and ecological processes that maintain healthy ecosystems. Scientists estimate that Earth is currently experiencing its sixth mass extinction event, with species disappearing at rates up to 1,000 times faster than natural background extinction rates. This biodiversity crisis threatens not only individual species but entire ecosystems and the services they provide to human society.

Protected areas represent one of the most important tools for biodiversity conservation, providing safe havens where natural processes can continue with minimal human interference. National parks, wildlife reserves, and marine protected areas cover approximately 15% of Earth's land surface and 8% of the ocean. However, many protected areas exist only on paper, lacking adequate funding, management, or enforcement to effectively safeguard their ecosystems.

The concept of ecosystem services has helped conservationists communicate the economic value of natural systems to policymakers and the public. Forests regulate water cycles, wetlands filter pollutants, and pollinators enable agricultural production. When these services are lost due to habitat destruction, they must often be replaced by expensive technological solutions or simply cannot be replaced at all.

Community-based conservation approaches recognize that local communities often have the strongest incentives to protect natural resources upon which their livelihoods depend. Indigenous peoples manage approximately 25% of the world's land surface and 80% of its biodiversity, often with traditional practices that have sustained ecosystems for thousands of years. Successful conservation programs increasingly involve local communities as partners rather than treating them as obstacles to protection efforts.

Climate change represents an overarching threat that affects all conservation efforts by altering temperature and precipitation patterns, shifting species distributions, and increasing the frequency of extreme weather events. Many species lack the ability to adapt quickly enough to changing conditions or migrate to suitable habitats. Conservation strategies must now consider how to help ecosystems and species adapt to changing climate conditions.

Habitat fragmentation poses particularly serious challenges for wildlife conservation in human-dominated landscapes. When large continuous habitats are broken into smaller isolated patches, many species cannot maintain viable populations due to edge effects, reduced genetic diversity, and barriers to movement. Wildlife corridors that connect protected areas can help address some of these problems by allowing animals to move between habitat patches.

Marine conservation faces unique challenges due to the fluid nature of ocean ecosystems and the difficulties of monitoring and enforcing regulations in marine environments. Ocean pollution, overfishing, and climate change are causing widespread degradation of marine ecosystems. Coral reefs, which support exceptional biodiversity, are particularly vulnerable to warming temperatures and ocean acidification.

The illegal wildlife trade represents a major threat to many endangered species, driven by demand for products such as ivory, rhino horn, and exotic pets. Criminal networks involved in wildlife trafficking often have connections to other illegal activities and pose challenges for law enforcement agencies. Reducing demand for illegal wildlife products requires education, cultural change, and strict enforcement of international trade regulations.

Restoration ecology has emerged as an important complement to protection efforts, focusing on repairing degraded ecosystems and returning them to more natural states. Successful restoration projects can increase habitat availability, improve ecosystem services, and reconnect fragmented landscapes. However, restoration is typically more expensive and less effective than preventing habitat destruction in the first place.

Technology is increasingly important for conservation efforts, providing new tools for monitoring wildlife populations, detecting illegal activities, and engaging the public in conservation activities. Satellite imagery can track deforestation in real-time, while DNA analysis helps combat wildlife trafficking by identifying the origins of confiscated products. Camera traps and acoustic monitoring systems provide non-invasive methods for studying elusive species.

Conservation financing presents ongoing challenges as protecting biodiversity competes with economic development for limited resources. Traditional funding sources include government agencies and charitable donations, but innovative mechanisms such as payment for ecosystem services, conservation bonds, and biodiversity offset programs are being developed to increase available resources.

The One Health approach recognizes the interconnections between human health, animal health, and environmental health. Zoonotic diseases that jump from animals to humans often emerge from areas where human activities have disrupted natural ecosystems. Protecting wildlife habitats and maintaining biodiversity can help prevent disease outbreaks while providing other conservation benefits.

Urban conservation is becoming increasingly important as more than half of the world's population now lives in cities. Green infrastructure such as parks, green roofs, and urban forests can provide habitat for wildlife while improving air quality and human well-being. Cities can also serve as testing grounds for conservation technologies and education programs.

International cooperation is essential for addressing conservation challenges that cross national boundaries. Migratory species require coordinated protection efforts across their entire ranges, while issues such as climate change and ocean pollution require global solutions. International treaties and agreements provide frameworks for cooperation, though implementation and enforcement remain challenging.

The future of environmental conservation will likely require transformative changes in how human societies relate to the natural world. This includes developing sustainable economic systems that account for environmental costs, creating more efficient and equitable resource use patterns, and fostering cultural values that prioritize long-term environmental health over short-term economic gains.

Education and public engagement play crucial roles in building support for conservation efforts and changing behaviors that contribute to environmental degradation. Environmental education programs in schools, nature centers, and through media can help people understand their connections to natural systems and inspire them to take conservation actions in their daily lives.

Adaptive management approaches recognize that conservation operates in complex and changing environments where traditional management strategies may not be sufficient. This approach emphasizes learning from experience, monitoring outcomes, and adjusting strategies based on new information and changing conditions. Successful conservation in the Anthropocene era will require flexibility, innovation, and collaboration across disciplines and sectors.`
        }
    ];

    // Insert test parts
    await db.insert(testParts).values(testPartsData);
    
    const questionsData = [
        // Test 34 Questions - Climate Science, Technology Innovation, Archaeological Discoveries
        // Part 1: Climate Science (Questions 1-13)
        { partId: 1, questionNumber: 1, questionText: 'Global average temperatures have risen by approximately 1.1 degrees Celsius since the late 19th century.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 2, questionText: 'Arctic regions have experienced uniform warming patterns similar to other parts of the world.', questionType: 'true_false_not_given', correctAnswer: 'FALSE', marks: 1 },
        { partId: 1, questionNumber: 3, questionText: 'Ice core data provides evidence of atmospheric conditions going back one million years.', questionType: 'true_false_not_given', correctAnswer: 'FALSE', marks: 1 },
        { partId: 1, questionNumber: 4, questionText: 'Climate models successfully reproduce observed temperature changes when human activities are included.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 5, questionText: 'Sea level rise is caused solely by the melting of ice sheets and glaciers.', questionType: 'true_false_not_given', correctAnswer: 'FALSE', marks: 1 },
        { partId: 1, questionNumber: 6, questionText: 'Ocean acidification affects organisms that build calcium carbonate shells.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 7, questionText: 'Over 97% of climate scientists agree that recent warming is primarily caused by human activities.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 8, questionText: 'Urban heat island effects make temperature measurements completely unreliable.', questionType: 'true_false_not_given', correctAnswer: 'FALSE', marks: 1 },
        { partId: 1, questionNumber: 9, questionText: 'Arctic amplification occurs because darker surfaces absorb more solar radiation than ice.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 10, questionText: 'Current atmospheric CO2 levels are the highest in 800,000 years.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 11, questionText: 'Greenhouse gases trap heat by absorbing infrared radiation.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },
        { partId: 1, questionNumber: 12, questionText: 'Scientists use data from weather stations exclusively to measure global temperatures.', questionType: 'true_false_not_given', correctAnswer: 'FALSE', marks: 1 },
        { partId: 1, questionNumber: 13, questionText: 'Sea levels could rise by one to four feet by the end of this century.', questionType: 'true_false_not_given', correctAnswer: 'TRUE', marks: 1 },

        // Part 2: Technology Innovation (Questions 14-26)
        { partId: 2, questionNumber: 14, questionText: 'What has accelerated the development of artificial intelligence?', questionType: 'multiple_choice', options: ['A) Government funding', 'B) Availability of big data and improved processing power', 'C) Reduced internet costs', 'D) Better programming languages'], correctAnswer: 'B', marks: 1 },
        { partId: 2, questionNumber: 15, questionText: 'According to the passage, what is a concern about AI development?', questionType: 'multiple_choice', options: ['A) High energy consumption', 'B) Lack of skilled programmers', 'C) Concentration in few large companies', 'D) Limited applications'], correctAnswer: 'C', marks: 1 },
        { partId: 2, questionNumber: 16, questionText: 'CRISPR-Cas9 is described as a technology for:', questionType: 'multiple_choice', options: ['A) Computer programming', 'B) Gene editing', 'C) Solar energy', 'D) Data storage'], correctAnswer: 'B', marks: 1 },
        { partId: 2, questionNumber: 17, questionText: 'What has made solar energy competitive with fossil fuels?', questionType: 'multiple_choice', options: ['A) Government subsidies', 'B) Better installation techniques', 'C) 90% cost reduction since 2010', 'D) Improved weather conditions'], correctAnswer: 'C', marks: 1 },
        { partId: 2, question