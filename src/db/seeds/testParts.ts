import { db } from '@/db';
import { testParts, tests } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const audioUrl = "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav";
    
    // Find all test parts that belong to tests with type "listening"
    const listeningTestParts = await db
        .select({ id: testParts.id })
        .from(testParts)
        .innerJoin(tests, eq(testParts.testId, tests.id))
        .where(eq(tests.type, "listening"));
    
    if (listeningTestParts.length === 0) {
        console.log('⚠️ No listening test parts found to update');
        return;
    }
    
    console.log(`📋 Found ${listeningTestParts.length} listening test parts to update`);
    
    // Update all listening test parts with the audio URL
    const partIds = listeningTestParts.map(part => part.id);
    
    const updateResult = await db
        .update(testParts)
        .set({ audioUrl: audioUrl })
        .where(eq(testParts.testId, 
            db.select({ id: tests.id })
              .from(tests)
              .where(eq(tests.type, "listening"))
        ));
    
    console.log(`✅ Successfully updated ${listeningTestParts.length} listening test parts with audio URL: ${audioUrl}`);
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});