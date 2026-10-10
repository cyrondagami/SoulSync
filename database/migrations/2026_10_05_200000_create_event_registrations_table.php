<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // pending | approved | rejected
            $table->string('status')->default('approved');
            $table->timestamps();

            $table->unique(['event_id', 'user_id']);
        });

        // false = instant join, true = admin must approve each request
        if (! Schema::hasColumn('events', 'requires_approval')) {
            Schema::table('events', function (Blueprint $table) {
                $table->boolean('requires_approval')->default(false);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('event_registrations');

        if (Schema::hasColumn('events', 'requires_approval')) {
            Schema::table('events', function (Blueprint $table) {
                $table->dropColumn('requires_approval');
            });
        }
    }
};
