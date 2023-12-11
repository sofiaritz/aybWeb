<script lang="ts">
  import { loggedIn, userInstanceData } from "../../lib/auth/stores";
</script>

<div class="md:w-8/12 flex flex-col gap-6">
  <div class="flex flex-col gap-3">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Support</h1>
    <span class="block">
      <span class="font-bold">aybWeb</span> is a frontend for <a href="https://github.com/marcua/ayb">ayb</a>.
      This interface is just a middleman between you and your ayb instance, everything is either sent to your ayb instance
      or stored locally.
    </span>
  </div>

  <div class="flex flex-col gap-3">
    <h2 class="text-xl font-bold">Reporting problems to the instance owner</h2>
    <span class="block">
      When encountering problems related to your instance such as reliability issues, downtimes, missing records, etc.
      you should contact the instance owner.
    </span>
    {#if $loggedIn}
      <span class="block">
        Your instance is the following: <a href={$userInstanceData.endpoint}>{$userInstanceData.endpoint}</a>.
      </span>
    {/if}
  </div>

  <div class="flex flex-col gap-3">
    <h2 class="text-xl font-bold">Reporting problems to ayb</h2>
    <span class="block">
      You should check the <a href="https://github.com/marcua/ayb/issues">issue tracker</a> for similar problems and
      creating an issue if it has not been reported yet.
    </span>
  </div>

  <div class="flex flex-col gap-3">
    <h2 class="text-xl font-bold">Reporting problems to aybWeb</h2>
    <span class="block">
      You should check the <a href="https://github.com/sofiaritz/aybWeb/issues">issue tracker</a> for similar problems
      and creating an issue if it has not been reported yet.
    </span>
    <span class="block">
      You can report any problems either in the issue tracker or
      <a href="https://sofiaritz.com/en/contact">directly to the main aybWeb maintainer</a>, and she will create the issue
      in your behalf.
    </span>
  </div>

  <div class="flex flex-col gap-3">
    <h2 class="text-xl font-bold">Privacy information</h2>
    <span class="block">aybWeb does not store any information about you. Only the instance owner does.</span>
    <div>
      <span class="block">By default, ayb stores the following information:</span>
      <ul class="list-disc pl-6 pt-1">
        <li>Username and e-mail.</li>
        <li>Database list and database contents.</li>
      </ul>
    </div>
  </div>
</div>
