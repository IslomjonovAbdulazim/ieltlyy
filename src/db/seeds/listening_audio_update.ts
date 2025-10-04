import { db } from '@/db';
import { tests, testParts } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    try {
        console.log('🎵 Starting listening test audio URL update...');
        
        const audioUrl = "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav";
        
        // First, get count of listening test parts before update
        const beforeQuery = await db
            .select({ 
                partId: testParts.id,
                testTitle: tests.title,
                partTitle: testParts.title,
                currentAudioUrl: testParts.audioUrl
            })
            .from(testParts)
            .innerJoin(tests, eq(testParts.testId, tests.id))
            .where(eq(tests.type, 'listening'));
            
        console.log(`📊 Found ${beforeQuery.length} listening test parts before update`);
        
        if (beforeQuery.length === 0) {
            console.log('⚠️ No listening test parts found to update');
            return;
        }
        
        // Log details of parts to be updated
        console.log('📋 Parts to be updated:');
        beforeQuery.forEach((part, index) => {
            console.log(`  ${index + 1}. Test: "${part.testTitle}" - Part: "${part.partTitle}" - Current URL: ${part.currentAudioUrl || 'NULL'}`);
        });
        
        // Perform update in transaction
        await db.transaction(async (tx) => {
            const updateResult = await tx
                .update(testParts)
                .set({ 
                    audioUrl: audioUrl
                })
                .where(
                    eq(testParts.testId, 
                        db.select({ id: tests.id })
                          .from(tests)
                          .where(eq(tests.type, 'listening'))
                          .limit(1)
                    )
                );
            
            console.log('🔄 Update executed in transaction');
        });
        
        // Verify the update worked by querying updated records
        const afterQuery = await db
            .select({
                partId: testParts.id,
                testTitle: tests.title,
                partTitle: testParts.title,
                updatedAudioUrl: testParts.audioUrl
            })
            .from(testParts)
            .innerJoin(tests, eq(testParts.testId, tests.id))
            .where(eq(tests.type, 'listening'));
            
        console.log(`📊 Found ${afterQuery.length} listening test parts after update`);
        
        // Verify all have the correct audio URL
        const successfulUpdates = afterQuery.filter(part => part.updatedAudioUrl === audioUrl);
        
        console.log('✅ Verification Results:');
        console.log(`  - Total listening parts: ${afterQuery.length}`);
        console.log(`  - Successfully updated: ${successfulUpdates.length}`);
        console.log(`  - Failed updates: ${afterQuery.length - successfulUpdates.length}`);
        
        // Log updated parts
        console.log('📋 Updated parts:');
        afterQuery.forEach((part, index) => {
            const status = part.updatedAudioUrl === audioUrl ? '✅' : '❌';
            console.log(`  ${index + 1}. ${status} Test: "${part.testTitle}" - Part: "${part.partTitle}" - New URL: ${part.updatedAudioUrl}`);
        });
        
        if (successfulUpdates.length === afterQuery.length && afterQuery.length > 0) {
            console.log('✅ All listening test parts successfully updated with audio URL');
        } else if (successfulUpdates.length > 0) {
            console.log(`⚠️ Partial success: ${successfulUpdates.length}/${afterQuery.length} parts updated`);
        } else {
            console.log('❌ No parts were successfully updated');
        }
        
        console.log('✅ Listening audio update seeder completed successfully');
        
    } catch (error) {
        console.error('❌ Seeder failed:', error);
        throw error;
    }
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
    process.exit(1);
});