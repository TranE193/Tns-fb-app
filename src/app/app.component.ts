import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '~/app/shared/services/firebase.service';
import * as application from 'tns-core-modules/application';
import { AppSync, InstallMode, SyncStatus } from 'nativescript-app-sync';
import { isIOS } from 'tns-core-modules/platform';

@Component({
    selector: 'ns-app', templateUrl: 'app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private static APPSYNC_ANDROID_STAGING_KEY = 'QFXTVVvehmMQOkCfE2grxIjJm9WYcgS7kfiRC';
    private static APPSYNC_ANDROID_PRODUCTION_KEY = 'QfzJIG83lp7FQi8OC9ppbpPiJtkfcgS7kfiRC';

    private static APPSYNC_IOS_STAGING_KEY = 'asd';

    // private static APPSYNC_ANDROID_PRODUCTION_KEY = "asd";

    constructor(private fs: FirebaseService) {
        fs.initFirebase();

        application.on(application.resumeEvent, () => {
            this.syncWithAppSyncServer();
        });


    }

    ngOnInit() { }

    syncWithAppSyncServer(): void {
        console.log('Querying AppSync..');
        AppSync.sync({
            deploymentKey: isIOS ? AppComponent.APPSYNC_IOS_STAGING_KEY : AppComponent.APPSYNC_ANDROID_STAGING_KEY,
            installMode: InstallMode.ON_NEXT_RESTART, // default InstallMode.ON_NEXT_RESTART
            mandatoryInstallMode: isIOS ? InstallMode.ON_NEXT_RESUME : InstallMode.IMMEDIATE, // default
                                                                                              // InstallMode.ON_NEXT_RESUME
            updateDialog: { // only used for InstallMode.IMMEDIATE
                optionalUpdateMessage: 'Optional update msg',
                updateTitle: 'Please restart the app',
                mandatoryUpdateMessage: 'Mandatory update msg',
                optionalIgnoreButtonLabel: 'Later',
                mandatoryContinueButtonLabel: isIOS ? 'Exit now' : 'Restart now',
                appendReleaseDescription: true // appends the description you (optionally) provided when releasing a
                                               // new version to AppSync
            }
        }, (syncStatus: SyncStatus): void => {
            if(syncStatus === SyncStatus.UP_TO_DATE) {
                console.log('AppSync: up to date');
            } else if(syncStatus === SyncStatus.UPDATE_INSTALLED) {
                console.log('AppSync: update installed');
            } else {
                console.log('AppSync: sync status: ' + syncStatus);
            }
        });
    }
}
