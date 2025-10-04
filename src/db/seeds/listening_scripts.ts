import { db } from '@/db';
import { testParts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

async function main() {
    // Part 1 Script - Social conversation about booking accommodation
    const part1Script = `
WOMAN: Good morning. I'm calling about the bed and breakfast accommodation you advertise online. Is it still available for next weekend?

MAN: Good morning! Yes, we do have availability. Let me just check... which dates exactly were you looking at?

WOMAN: Well, I was hoping to arrive on Friday the 15th of March and stay for three nights, so checking out on Monday morning.

MAN: Friday the 15th... let me see... Yes, that works perfectly. We have our garden room available, which is very popular with guests. It has a lovely view of the courtyard.

WOMAN: That sounds nice. Could you tell me a bit more about the facilities? I saw on your website that breakfast is included, but I wasn't sure about other meals.

MAN: Yes, breakfast is definitely included - we serve it from 7:30 to 9:30 each morning. It's a full English breakfast, though we can also do continental if you prefer. As for other meals, we don't provide lunch or dinner, but there are several excellent restaurants within walking distance.

WOMAN: Okay, that's fine. And what about parking? I'll be driving down from Manchester.

MAN: We have a small car park at the back of the building - it's free for guests, but it's first come, first served. If it's full, there's street parking available, though you'd need to pay at the meter during the day.

WOMAN: I see. And the room rate - what would that be for the three nights?

MAN: The garden room is £95 per night, so that would be £285 in total for your stay. That includes the breakfast, of course, and all taxes.

WOMAN: That seems reasonable. Oh, I should mention - I have some dietary requirements. I'm vegetarian and I'm also allergic to nuts. Would that be a problem for breakfast?

MAN: Not at all! We're very experienced with dietary requirements. I'll make a note on your booking about the vegetarian meals and the nut allergy. Our cook is excellent at accommodating special needs.

WOMAN: That's wonderful. And I assume you have Wi-Fi available?

MAN: Yes, free Wi-Fi throughout the building. The password is 'garden2024' - all lowercase, and that's the number 2024 at the end.

WOMAN: Perfect. One more thing - is there somewhere I can store my bicycle? I'm planning to cycle around the local area.

MAN: Absolutely. We have secure bicycle storage in our garden shed. Just let us know when you arrive and I'll show you where it is.

WOMAN: Excellent. I'd like to make the booking then. What information do you need from me?

MAN: I'll need your full name, a contact telephone number, and a credit card to secure the booking. We don't charge anything now, but we do need the card details.

WOMAN: My name is Sarah Thompson, that's T-H-O-M-P-S-O-N. My mobile number is 07794 561 832.

MAN: Thank you, Sarah. And the credit card details?

WOMAN: It's a Visa card. The number is 4532 1598 7634 2210, expiry date March 2027, and the security code is 849.

MAN: Perfect. I've got all that down. You should receive a confirmation email within the next hour with all the details, including our address and directions.

WOMAN: That's great. Oh, what time can I check in on Friday?

MAN: Check-in is from 3 PM onwards. If you arrive earlier, we're happy to store your luggage until your room is ready.

WOMAN: Perfect. Thank you so much for your help. I'm really looking forward to my stay.

MAN: Thank you, Sarah. We look forward to welcoming you on Friday the 15th. Have a lovely day!

WOMAN: You too. Goodbye!

MAN: Goodbye!
    `;

    // Part 2 Script - Tour guide describing a historic house
    const part2Script = `
Good afternoon, everyone, and welcome to Ashford Manor, one of the finest examples of Tudor architecture in the county. I'm David, and I'll be your guide today as we explore this magnificent house and its beautiful gardens.

Before we begin our tour, let me give you some background information about this remarkable building. Ashford Manor was built in 1547 by Sir William Ashford, a wealthy merchant who made his fortune in the wool trade. The house remained in the Ashford family for over 400 years, until 1962, when it was donated to the National Trust.

What makes this house particularly special is that it's survived virtually unchanged since the 16th century. Unlike many historic houses that were modernized over the centuries, Ashford Manor gives us an authentic glimpse into Tudor domestic life.

As we walk through the house today, you'll notice several distinctive features. First, the great hall, which we'll enter in a moment, still has its original hammerbeam roof - that's the wooden ceiling with decorative arched supports. This type of roof was considered the height of luxury in Tudor times.

The house consists of three floors. On the ground floor, we have the great hall, the kitchen, and what was originally called the winter parlor - a smaller, more intimate room where the family would gather during cold months. The first floor contains the main bedrooms, including the master bedroom with its elaborate four-poster bed, and the solar - a private sitting room for the lady of the house.

The second floor, which visitors often find most interesting, houses the servants' quarters and what we call the long gallery. This gallery was used for exercise during bad weather and for displaying portraits of the family and important guests.

One of the most fascinating aspects of Ashford Manor is its collection of original furniture and household items. In the kitchen, for example, you'll see cooking utensils that are over 450 years old, including a collection of pewter plates and wooden bowls that would have been used daily by the household.

The gardens, which we'll visit after touring the house, were designed in the formal Tudor style. They feature geometric patterns created with low hedges - what we call 'knot gardens' - as well as herb and vegetable plots that would have supplied the household's needs. The garden also includes a dovecote, where pigeons were kept as a source of fresh meat throughout the winter months.

During our tour today, please feel free to ask questions. I should mention that photography is allowed in most areas, but please don't use flash in the bedrooms, as the light can damage the ancient textiles.

For those interested in learning more, we have an excellent guidebook available in the gift shop, which includes detailed floor plans and historical documents. We also offer special behind-the-scenes tours on the first Saturday of each month, where you can see areas not usually open to the public, including the attic spaces and the original Tudor cellars.

Now, before we begin, are there any questions about what we'll be seeing today? No? Excellent. Then let's make our way to the great hall, where our journey through Tudor England begins.

As we enter the great hall, notice how the afternoon light streams through those magnificent stained glass windows...
    `;

    // Part 3 Script - Academic discussion about course selection
    const part3Script = `
TUTOR: Right then, Sarah and James, thanks for coming to see me about your module choices for next semester. I know it can be quite overwhelming with all the options available. Sarah, shall we start with you? What are you thinking about?

SARAH: Well, Dr. Peterson, I'm really torn between several modules. I'm majoring in History, but I'm interested in broadening my knowledge. I've been looking at 'Cultural Anthropology' and 'Medieval Literature,' but I'm also considering 'Research Methods in Social Sciences.'

TUTOR: Those are quite diverse choices. What's driving your interest in Cultural Anthropology particularly?

SARAH: I think it would complement my historical studies really well. I mean, understanding how different cultures develop and interact seems crucial for historical analysis. Plus, Professor Williams mentioned it involves fieldwork, which sounds fascinating.

JAMES: That's interesting, Sarah. I've been looking at Cultural Anthropology too, actually. But I'm coming at it from a completely different angle - I'm studying Psychology, and I think understanding cultural influences on behavior could be really valuable.

TUTOR: That's an excellent point, James. Cross-disciplinary study often provides the most interesting insights. What other modules are you considering?

JAMES: Well, I'm definitely taking 'Advanced Statistical Methods' - that's core for my degree. But I'm trying to decide between 'Cognitive Psychology' and 'Social Psychology in Practice.' The problem is they're both offered at the same time slot on Wednesdays.

SARAH: Oh, that's frustrating. Have you spoken to the department about it? Sometimes they can make exceptions if there's enough demand.

JAMES: I did ask, but apparently the Social Psychology module is quite small - only about 15 students - so they can't justify running it at multiple times.

TUTOR: That's the challenge with specialized modules, I'm afraid. James, have you considered which one would be more beneficial for your future plans? Are you thinking about postgraduate study or going straight into employment?

JAMES: I'm definitely planning to do a Master's degree, probably in Clinical Psychology. From that perspective, I suppose Cognitive Psychology might be more directly relevant.

SARAH: But wouldn't Social Psychology be useful too? I mean, clinical work involves understanding how people interact with others and how social factors affect mental health.

TUTOR: Both of you make valid points. James, might I suggest you look at the reading lists for both modules? That might help you decide which approach interests you more. Also, consider speaking to some second-year students who've taken these modules.

JAMES: That's a good idea. Actually, Sarah, you mentioned Research Methods in Social Sciences. I've been wondering about that one too. What's the workload like?

SARAH: From what I've heard, it's quite intensive. There's a major research project that runs throughout the semester, and you have to conduct your own small-scale study. But apparently, it's really valuable - especially if you're planning postgraduate work.

TUTOR: Absolutely. Research Methods is one of those modules that students often find challenging at the time, but incredibly valuable in retrospect. Sarah, given your interest in Cultural Anthropology, it could provide excellent methodological grounding.

SARAH: The thing is, I'm already taking 'Advanced Historical Analysis' which is quite demanding. I'm worried about overloading myself. How many credits would you recommend per semester?

TUTOR: Generally, I'd suggest no more than 60 credits per semester for undergraduate students. That typically means four modules. What are you taking in total?

SARAH: Well, Advanced Historical Analysis is 20 credits, and most of the others are 15 credits each. So if I take Cultural Anthropology, Medieval Literature, and Research Methods, that would be 50 credits plus the 20, so 70 in total.

JAMES: That does sound like a lot. Could you maybe take one of those modules next year instead?

TUTOR: James raises a good point. Sarah, Medieval Literature is offered every year, so you could delay that one. Research Methods, however, is only offered in the spring semester.

SARAH: Hmm, so maybe I should prioritize Research Methods and Cultural Anthropology this semester, and leave Medieval Literature for next year?

TUTOR: I think that sounds like a sensible plan. And it would give you a good balance between your core historical studies and broader social science perspectives.

JAMES: What about prerequisites? Are there any modules I should have completed before taking Advanced Statistical Methods?

TUTOR: You should have completed Introduction to Statistics, which I believe you did last semester. The main thing with Advanced Statistical Methods is staying on top of the weekly problem sets - they build on each other quite rapidly.

SARAH: Is it true that some modules have group projects? I've heard mixed things about group work at university level.

TUTOR: Several modules do include group components, yes. Research Methods, for instance, has both individual and group elements. The group work can be challenging, but it's also excellent preparation for the workplace, where collaboration is essential.

JAMES: I suppose we should also think about how our choices this semester affect what we can take later. Are there any fourth-year modules that have specific prerequisites?

TUTOR: That's very forward-thinking, James. Most of the advanced modules in Psychology require the core second and third-year modules, but having Research Methods completed early could give you more options in your final year.
    `;

    // Part 4 Script - Academic lecture on renewable energy
    const part4Script = `
Good morning, everyone. Today's lecture focuses on renewable energy technologies and their role in addressing climate change. We'll examine the current state of renewable energy adoption, the technological advances that have made these sources more viable, and the challenges that still need to be overcome.

Let me begin with some context. When we talk about renewable energy, we're referring to energy sources that are naturally replenished and theoretically inexhaustible. This includes solar power, wind energy, hydroelectric power, geothermal energy, and biomass. What distinguishes these from fossil fuels is not just their renewable nature, but their significantly lower carbon emissions during operation.

The growth in renewable energy adoption has been remarkable over the past two decades. According to the International Energy Agency's latest report, renewable energy capacity has increased by over 300% since 2000. To put this in perspective, in 2000, renewable sources accounted for approximately 18% of global electricity generation. By 2023, this figure had risen to nearly 30%.

Solar power has seen the most dramatic expansion. The cost of solar photovoltaic panels has decreased by over 90% since 2009, making solar power cost-competitive with fossil fuels in many regions. This cost reduction has been driven by several factors: improvements in manufacturing efficiency, economies of scale, and technological advances in panel design and materials.

Wind energy has followed a similar trajectory. Modern wind turbines are significantly more efficient than their predecessors. The average capacity factor - that's the actual energy output compared to theoretical maximum output - has improved from around 25% in the 1990s to over 40% for the most advanced offshore installations today.

However, renewable energy faces several significant challenges. The most prominent is intermittency - the fact that solar and wind power generation depends on weather conditions. This creates what we call the 'duck curve' problem in electricity grids. During sunny afternoons, solar power generation peaks, but electricity demand is often lower than in the evening when the sun sets.

Energy storage technology is crucial for addressing this challenge. Battery storage, particularly lithium-ion batteries, has seen rapid development. The cost of battery storage has fallen by approximately 80% since 2012. Nevertheless, storing energy for extended periods - say, weeks or months - remains economically challenging with current technology.

Grid infrastructure presents another challenge. Traditional electricity grids were designed for centralized power generation from large fossil fuel plants. Integrating distributed renewable sources requires significant upgrades to grid infrastructure and sophisticated management systems to balance supply and demand in real-time.

Let's examine some specific case studies. Denmark provides an excellent example of successful renewable energy integration. The country now generates over 50% of its electricity from wind power. This has been achieved through substantial investment in offshore wind farms and grid infrastructure, as well as interconnections with neighboring countries that allow excess power to be exported.

Similarly, Costa Rica has achieved remarkable success with renewable energy, generating nearly 100% of its electricity from renewable sources in recent years. However, it's important to note that Costa Rica's success is partly due to its geographic advantages - abundant rainfall for hydroelectric power and volcanic activity for geothermal energy.

The economic implications of the renewable energy transition are substantial. The International Renewable Energy Agency estimates that the global renewable energy sector employed over 13 million people in 2022. This figure is projected to reach 85 million by 2030 if current growth trends continue.

Investment patterns are also shifting dramatically. In 2023, global investment in renewable energy exceeded $1.8 trillion, more than double the investment in fossil fuel projects. This shift is driven not just by environmental concerns, but by economic fundamentals - renewable energy is increasingly the cheapest option for new electricity generation in most parts of the world.

Looking ahead, several emerging technologies could accelerate the renewable energy transition. Floating solar farms could significantly expand solar capacity by utilizing reservoirs and coastal waters. Advanced geothermal systems could make geothermal energy viable in regions without traditional geothermal resources.

Hydrogen production using renewable electricity is another promising development. Green hydrogen, as it's called, could provide a way to store renewable energy for long periods and could decarbonize sectors like steel production and shipping that are difficult to electrify directly.

In conclusion, while renewable energy has achieved remarkable growth and cost reductions, significant challenges remain. The transition to a fully renewable energy system will require continued technological innovation, substantial infrastructure investment, and sophisticated policy frameworks. However, the economic and environmental imperatives make this transition not just desirable, but inevitable.

Next week, we'll examine specific policy mechanisms that governments have used to accelerate renewable energy adoption, including feed-in tariffs, renewable portfolio standards, and carbon pricing mechanisms.
    `;

    try {
        // Update Part 1 scripts (Social conversations)
        await db.update(testParts)
            .set({ listeningScript: part1Script })
            .where(and(
                eq(testParts.partNumber, 1)
            ));

        // Update Part 2 scripts (Monologues)
        await db.update(testParts)
            .set({ listeningScript: part2Script })
            .where(and(
                eq(testParts.partNumber, 2)
            ));

        // Update Part 3 scripts (Academic discussions)
        await db.update(testParts)
            .set({ listeningScript: part3Script })
            .where(and(
                eq(testParts.partNumber, 3)
            ));

        // Update Part 4 scripts (Academic lectures)
        await db.update(testParts)
            .set({ listeningScript: part4Script })
            .where(and(
                eq(testParts.partNumber, 4)
            ));

        console.log('✅ Listening scripts seeder completed successfully');
    } catch (error) {
        console.error('❌ Error updating listening scripts:', error);
        throw error;
    }
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});