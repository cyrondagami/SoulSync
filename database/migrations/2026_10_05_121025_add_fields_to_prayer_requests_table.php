<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('prayer_requests', function (Blueprint $table) {
            if (!Schema::hasColumn('prayer_requests', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable();
            }
            if (!Schema::hasColumn('prayer_requests', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('prayer_requests', 'request')) {
                $table->text('request')->nullable();
            }
            if (!Schema::hasColumn('prayer_requests', 'is_anonymous')) {
                $table->boolean('is_anonymous')->default(false);
            }
            if (!Schema::hasColumn('prayer_requests', 'status')) {
                $table->string('status')->default('approved');
            }
        });
    }

    public function down(): void
    {
        Schema::table('prayer_requests', function (Blueprint $table) {
            $table->dropColumn(['user_id', 'name', 'request', 'is_anonymous', 'status']);
        });
    }
};