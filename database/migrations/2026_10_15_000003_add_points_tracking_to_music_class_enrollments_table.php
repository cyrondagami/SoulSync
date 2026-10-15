<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('music_class_enrollments', function (Blueprint $table) {
            if (! Schema::hasColumn('music_class_enrollments', 'completed_at')) {
                $table->timestamp('completed_at')->nullable()->after('reviewed_at');
            }

            if (! Schema::hasColumn('music_class_enrollments', 'completed_by')) {
                $table->foreignId('completed_by')->nullable()->constrained('users')->nullOnDelete()->after('completed_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('music_class_enrollments', function (Blueprint $table) {
            if (Schema::hasColumn('music_class_enrollments', 'completed_by')) {
                $table->dropConstrainedForeignId('completed_by');
            }

            if (Schema::hasColumn('music_class_enrollments', 'completed_at')) {
                $table->dropColumn('completed_at');
            }
        });
    }
};
