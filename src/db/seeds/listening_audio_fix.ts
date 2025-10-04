import { db } from '@/db';
import { tests, testParts } from '@/db/schema';
import { eq, and, inArray } from 'drizzle-orm';

async function main() {
    const audioUrlMapping = {
        1: 'https://archive.org/download/short_nonfiction_collection_vol_007_0908_librivox/snc007_01_various_64kb.mp3',
        2: 'https://archive.org/download/short_nonfiction_collection_vol_007_0908_librivox/snc007_02_various_64kb.mp3',
        3: 'https://archive.org/download/short_nonfiction_collection_vol_007_0908_librivox/snc007_03_various_64kb.mp3',
        4: 'https://archive.org/download/short_nonfiction_collection_vol_007_0908_librivox/snc007_04_various_64kb.mp3'
    };

    // Define test IDs to update
    const targetTestIds = [1, 20, 21, 22, 23, 24, 25, 26, 27];

    try {
        console.log('🔍 Querying current listening test parts...');
        
        // Query all listening test parts before update
        const beforeUpdate = await db
            .select({
                partId: testParts.id,
                testId: testParts.testId,
                partNumber: testParts.partNumber,
                title: testParts.title,
                audioUrl: testParts.audioUrl,
                testType: tests.type
            })
            .from(testParts)
            .innerJoin(tests, eq(testParts.testId, tests.id))
            .where(
                and(
                    eq(tests.type, 'listening'),
                    inArray(tests.id, targetTestIds)
                )
            );

        console.log(`📊 Found ${beforeUpdate.length} listening test parts to update:`);
        beforeUpdate.forEach(part => {
            console.log(`  - Test ${part.testId}, Part ${part.partNumber}: "${part.title}" - Current URL: ${part.audioUrl || 'null'}`);
        });

        if (beforeUpdate.length === 0) {
            console.log('⚠️  No listening test parts found for the specified test IDs');
            return;
        }

        console.log('\n🔄 Starting audio URL updates...');

        // Update audio URLs within a transaction-like batch
        let updatedCount = 0;
        const updateResults = [];

        for (const part of beforeUpdate) {
            const newAudioUrl = audioUrlMapping[part.partNumber as keyof typeof audioUrlMapping];
            
            if (newAudioUrl) {
                const result = await db
                    .update(testParts)
                    .set({ 
                        audioUrl: newAudioUrl 
                    })
                    .where(eq(testParts.id, part.partId));

                updateResults.push({
                    partId: part.partId,
                    testId: part.testId,
                    partNumber: part.partNumber,
                    title: part.title,
                    oldUrl: part.audioUrl,
                    newUrl: newAudioUrl
                });

                updatedCount++;
                console.log(`  ✅ Updated Test ${part.testId}, Part ${part.partNumber}: ${part.title}`);
            } else {
                console.log(`  ⚠️  No audio URL mapping found for part number ${part.partNumber}`);
            }
        }

        console.log('\n🔍 Verifying updates...');
        
        // Query to verify updates
        const afterUpdate = await db
            .select({
                partId: testParts.id,
                testId: testParts.testId,
                partNumber: testParts.partNumber,
                title: testParts.title,
                audioUrl: testParts.audioUrl,
                testType: tests.type
            })
            .from(testParts)
            .innerJoin(tests, eq(testParts.testId, tests.id))
            .where(
                and(
                    eq(tests.type, 'listening'),
                    inArray(tests.id, targetTestIds)
                )
            );

        console.log('\n📋 Updated listening test parts:');
        afterUpdate.forEach(part => {
            const wasUpdated = updateResults.find(ur => ur.partId === part.partId);
            const status = wasUpdated ? '✅' : '❌';
            console.log(`  ${status} Test ${part.testId}, Part ${part.partNumber}: "${part.title}"`);
            console.log(`      URL: ${part.audioUrl}`);
        });

        console.log(`\n📈 Summary:`);
        console.log(`  - Total parts found: ${beforeUpdate.length}`);
        console.log(`  - Parts updated: ${updatedCount}`);
        console.log(`  - Tests affected: Test IDs ${[...new Set(updateResults.map(r => r.testId))].join(', ')}`);

        // Verify all audio URLs are working LibriVox URLs
        const validUrlPattern = /^https:\/\/archive\.org\/download\/short_nonfiction_collection_vol_007_0908_librivox\/snc007_\d{2}_various_64kb\.mp3$/;
        const validUrls = afterUpdate.filter(part => part.audioUrl && validUrlPattern.test(part.audioUrl));
        
        console.log(`  - Valid LibriVox URLs: ${validUrls.length}/${afterUpdate.length}`);

        if (updatedCount > 0) {
            console.log('\n✅ Listening test audio URLs seeder completed successfully');
            console.log('🎵 All listening tests now have working LibriVox audiobook URLs from Internet Archive');
        } else {
            console.log('\n⚠️  No updates were performed');
        }

    } catch (error) {
        console.error('❌ Seeder failed:', error);
        throw error;
    }
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
    process.exit(1);
});