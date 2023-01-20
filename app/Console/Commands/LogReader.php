<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;
use App\Models\BugloosService;

class LogReader extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'logreader:insert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $months=[
            "Jan"=>"01",
            "Feb"=>"02",
            "Mar"=>"03",
            "Apr"=>"04",
            "May"=>"05",
            "Jun"=>"06",
            "Jul"=>"07",
            "Aug"=>"08",
            "Sep"=>"09",
            "Oct"=>"10",
            "Nov"=>"11",
            "Dec"=>"12",
        ];

        $file = fopen(public_path("/logs.txt"), "r") or exit("Unable to open file!");

        while(!feof($file)) {
            
        $line= fgets($file). "<br>";
        $pieces = explode(" ", $line);
        // Log::info($pieces[0]);
        // Log::info($pieces[1]);
        $custom_date=$pieces[2];
        $custom_date=trim($custom_date);
        $custom_date=substr($custom_date,1, strlen($custom_date)-2);
        Log::info($custom_date);
        $custom_Date_poeces = explode(":", $custom_date);
        $custom_year_mount_day=explode("/", $custom_Date_poeces[0]);
        $finaly_date=$custom_year_mount_day[2].":".$months[$custom_year_mount_day[1]].":".$custom_year_mount_day[0]." ".$custom_Date_poeces[1].":".$custom_Date_poeces[2].":".$custom_Date_poeces[3];
        Log::info($finaly_date);
        // Log::info($pieces[4]);
        // Log::info($pieces[5]);
        // Log::info($pieces[6]);
        BugloosService::create([
            'serviceNames' => $pieces[0] ,
            'statusCode' => explode("<br>", $pieces[6])[0] ,
            'description' => $pieces[3].$pieces[4].$pieces[5] ,
            'created_at' => $finaly_date
        ]);
        Log::info("evety thing is clear");
    }
        fclose($file);
    }
}
