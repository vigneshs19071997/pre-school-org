import 'dotenv/config';
import { db, schema } from './index';
import { tenantSlug } from '@config/index';
import { activityLibrary } from '../lib/kids-content';

/**
 * Seeds the shared kids-zone activity library plus a couple of sample rows.
 * Activities are inserted as isGlobal so every tenant inherits them - you are
 * not duplicating the whole question bank per school.
 *
 * Run with: npm run db:seed
 */
async function main() {
  console.log(`Seeding for tenant: ${tenantSlug}`);

  for (const a of activityLibrary) {
    const [row] = await db
      .insert(schema.activities)
      .values({
        tenantId: null,
        isGlobal: true,
        slug: a.slug,
        title: a.title,
        kind: a.kind,
        ageBand: a.ageBand,
        icon: a.icon,
        tone: a.tone,
        published: true,
      })
      .returning({ id: schema.activities.id });

    await db.insert(schema.activityItems).values(
      a.items.map((item, i) => ({
        activityId: row.id,
        sortOrder: i,
        promptText: item.promptText,
        options: item.options,
        correctOptionId: item.correctOptionId,
        rewardSticker: item.rewardSticker ?? 'star',
      }))
    );

    console.log(`  activity: ${a.slug} (${a.items.length} items)`);
  }

  await db.insert(schema.testimonials).values([
    {
      tenantId: tenantSlug,
      parentName: 'Divya R.',
      relation: 'Mother of a nursery child',
      quote:
        'She used to cry at the gate for the first week. Now she waves us off before we have parked.',
      published: true,
      sortOrder: 0,
    },
    {
      tenantId: tenantSlug,
      parentName: 'Karthik S.',
      relation: 'Father of a playgroup child',
      quote:
        'The afternoon note tells me what he ate and what he made. I stopped worrying by the second month.',
      published: true,
      sortOrder: 1,
    },
  ]);

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
