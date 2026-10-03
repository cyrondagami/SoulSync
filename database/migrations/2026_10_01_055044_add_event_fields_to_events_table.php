<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('title')->after('id');
            $table->string('category')->after('title');
            $table->text('description')->nullable()->after('category');

            $table->date('date')->after('description');
            $table->string('time')->after('date');

            $table->string('location')->after('time');
            $table->string('organizer')
                ->default('Youth Ministry')
                ->after('location');

            $table->integer('capacity')
                ->default(100)
                ->after('organizer');

            $table->integer('attendees')
                ->default(0)
                ->after('capacity');

            $table->string('status')
                ->default('Upcoming')
                ->after('attendees');

            $table->string('icon')
                ->nullable()
                ->after('status');

            $table->boolean('featured')
                ->default(false)
                ->after('icon');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'title',
                'category',
                'description',
                'date',
                'time',
                'location',
                'organizer',
                'capacity',
                'attendees',
                'status',
                'icon',
                'featured',
            ]);
        });
    }
};