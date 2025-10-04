import { db } from '@/db';
import { tests, testParts } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

async function main() {
    const workingAudioUrl = 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/viper.mp3';
    
    console.log('🔄 Starting audio URL update process...');
    
    // Step 1: Query all tests where type = 'listening'
    const listeningTests = await db.select({ id: tests.id }).from(tests).where(eq(tests.type, 'listening'));
    
    if (listeningTests.length === 0) {
        console.log('⚠️ No listening tests found in the database');
        return;
    }
    
    const listeningTestIds = listeningTests.map(test => test.id);
    console.log(`📊 Found ${listeningTests.length} listening tests with IDs: [${listeningTestIds.join(', ')}]`);
    
    // Step 2: Query current test parts to see before state
    const testPartsBeforeUpdate = await db.select({
        id: testParts.id,
        testId: testParts.testId,
        audioUrl: testParts.audioUrl
    }).from(testParts).where(inArray(testParts.testId, listeningTestIds));
    
    console.log(`📋 Found ${testPartsBeforeUpdate.length} test parts for listening tests`);
    
    // Log before state
    const partsWithAudio = testPartsBeforeUpdate.filter(part => part.audioUrl !== null);
    const partsWithoutAudio = testPartsBeforeUpdate.filter(part => part.audioUrl === null);
    
    console.log(`📈 Before update:`);
    console.log(`   - Parts with audio URL: ${partsWithAudio.length}`);
    console.log(`   - Parts without audio URL: ${partsWithoutAudio.length}`);
    
    if (partsWithAudio.length > 0) {
        console.log(`   - Current audio URLs found:`);
        const uniqueUrls = [...new Set(partsWithAudio.map(p => p.audioUrl))];
        uniqueUrls.forEach(url => {
            const count = partsWithAudio.filter(p => p.audioUrl === url).length;
            console.log(`     * "${url}" (${count} parts)`);
        });
    }
    
    // Step 3: Update ALL testParts records where testId matches any listening test ID
    const updateResult = await db
        .update(testParts)
        .set({ audioUrl: workingAudioUrl })
        .where(inArray(testParts.testId, listeningTestIds));
    
    console.log(`✅ Updated ${testPartsBeforeUpdate.length} test parts with new audio URL`);
    
    // Step 4: Verify the updates were successful
    const testPartsAfterUpdate = await db.select({
        id: testParts.id,
        testId: testParts.testId,
        audioUrl: testParts.audioUrl
    }).from(testParts).where(inArray(testParts.testId, listeningTestIds));
    
    const successfulUpdates = testPartsAfterUpdate.filter(part => part.audioUrl === workingAudioUrl);
    const failedUpdates = testPartsAfterUpdate.filter(part => part.audioUrl !== workingAudioUrl);
    
    console.log(`📈 After update:`);
    console.log(`   - Parts successfully updated: ${successfulUpdates.length}`);
    console.log(`   - Parts with working audio URL: ${testPartsAfterUpdate.length}`);
    console.log(`   - Failed updates: ${failedUpdates.length}`);
    
    if (failedUpdates.length > 0) {
        console.log(`   - Failed part IDs: [${failedUpdates.map(p => p.id).join(', ')}]`);
    }
    
    // Final verification
    if (successfulUpdates.length === testPartsBeforeUpdate.length) {
        console.log('✅ All listening test parts have been successfully updated with working audio URL');
        console.log(`🎵 New audio URL: ${workingAudioUrl}`);
    } else {
        console.log('⚠️ Some updates may have failed - please check the database manually');
    }
    
    console.log('✅ Audio URL update seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});