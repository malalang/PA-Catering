import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST() {
  try {
    const supabase = await createClient();
    
    // Check if user is authenticated (optional - you can remove this if you want public seeding)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    // Optional: Only allow seeding if user is authenticated
    // if (authError || !user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Read the SQL file
    const sqlPath = join(process.cwd(), 'supabase_migrations', 'seed_products.sql');
    const sqlContent = readFileSync(sqlPath, 'utf-8');

    // Execute the SQL
    // Note: Supabase client doesn't have a direct execute method for raw SQL
    // We'll need to use the REST API or RPC function, or parse and insert row by row
    // For now, let's parse the INSERT statements and execute them
    
    const insertStatements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.toUpperCase().startsWith('INSERT'));

    if (insertStatements.length === 0) {
      return NextResponse.json({ error: 'No INSERT statements found' }, { status: 400 });
    }

    // Parse the first INSERT statement to extract values
    const mainInsert = insertStatements[0];
    const valuesMatch = mainInsert.match(/VALUES\s*([\s\S]+)/i);
    
    if (!valuesMatch) {
      return NextResponse.json({ error: 'Could not parse INSERT statement' }, { status: 400 });
    }

    // Parse values - this is a simplified parser
    const valuesString = valuesMatch[1];
    const rows: Array<{
      name: string;
      category: string;
      description: string | null;
      price: number;
      image_url: string | null;
      badge: string | null;
      stock: number;
    }> = [];

    // Split by rows (each row is in parentheses)
    const rowMatches = valuesString.matchAll(/\(([^)]+)\)/g);
    
    for (const match of rowMatches) {
      const rowValues = match[1].split(',').map(v => v.trim());
      
      if (rowValues.length >= 7) {
        const name = rowValues[0].replace(/^'|'$/g, '');
        const category = rowValues[1].replace(/^'|'$/g, '');
        const description = rowValues[2] === 'NULL' ? null : rowValues[2].replace(/^'|'$/g, '');
        const price = parseFloat(rowValues[3]);
        const image_url = rowValues[4] === 'NULL' ? null : rowValues[4].replace(/^'|'$/g, '');
        const badge = rowValues[5] === 'NULL' ? null : rowValues[5].replace(/^'|'$/g, '');
        const stock = parseInt(rowValues[6], 10);

        rows.push({
          name,
          category,
          description,
          price,
          image_url,
          badge,
          stock,
        });
      }
    }

    // Insert products in batches
    const batchSize = 10;
    let inserted = 0;
    let errors: string[] = [];

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      
      // @ts-ignore - Supabase type inference issue with Database types
      const { error } = await supabase.from('products').insert(batch);
      
      if (error) {
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        inserted += batch.length;
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Inserted ${inserted} products, but encountered errors`,
          errors 
        },
        { status: 207 } // Multi-Status
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Successfully seeded ${inserted} products` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}



