<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('event_registrations', function (Blueprint $table) {
            if (!Schema::hasColumn('event_registrations', 'status')) {
                $table->string('status')->default('pending');
            }

            if (!Schema::hasColumn('event_registrations', 'decline_reason')) {
                $table->text('decline_reason')->nullable();
            }
        });

        // Ibalik sa "pending" ang default kung "approved" ito dati
        Schema::table('event_registrations', function (Blueprint $table) {
            $table->string('status')->default('pending')->change();
        });

        if (!Schema::hasColumn('events', 'requires_approval')) {
            Schema::table('events', function (Blueprint $table) {
                $table->boolean('requires_approval')->default(true);
            });
        }
    }

    public function down(): void
    {
        //
    }
};