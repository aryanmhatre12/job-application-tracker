var app = angular.module("jobApp", []);

app.controller("JobController", function ($scope) {

    // Load data from localStorage
    let savedApplications = JSON.parse(
        localStorage.getItem("applications")
    );

    // If nothing saved, use default data
    $scope.applications = savedApplications || [
        {
            company: "Hudl",
            role: "Support Analyst",
            status: "Interview Scheduled"
        },
        {
            company: "TCS",
            role: "Software Developer",
            status: "Applied"
        }
    ];

    $scope.totalApplications = $scope.applications.length;
    function updateStats() {

    $scope.appliedCount =
        $scope.applications.filter(
            app => app.status === "Applied"
        ).length;

    $scope.interviewCount =
        $scope.applications.filter(
            app => app.status === "Interview Scheduled"
        ).length;

    $scope.selectedCount =
        $scope.applications.filter(
            app => app.status === "Selected"
        ).length;

    $scope.rejectedCount =
        $scope.applications.filter(
            app => app.status === "Rejected"
        ).length;
}

updateStats();

    // Add application
    $scope.addNewApplication = function () {

        if (
            !$scope.newCompany ||
            !$scope.newRole ||
            !$scope.newStatus
        ) {
            alert("Please fill all fields");
            return;
        }

        $scope.applications.push({
    company: $scope.newCompany,
    role: $scope.newRole,
    date: $scope.newDate,
    status: $scope.newStatus
});

        localStorage.setItem(
            "applications",
            JSON.stringify($scope.applications)
        );

        $scope.totalApplications = $scope.applications.length;
        updateStats();
        $scope.newCompany = "";
        $scope.newRole = "";
        $scope.newStatus = "";
    };

    // Delete application
    $scope.deleteApplication = function (index) {

        $scope.applications.splice(index, 1);

        localStorage.setItem(
            "applications",
            JSON.stringify($scope.applications)
        );

        $scope.totalApplications = $scope.applications.length;
        updateStats();
    };
$scope.editApplication = function (index) {

    $scope.newCompany =
        $scope.applications[index].company;

    $scope.newRole =
        $scope.applications[index].role;

    $scope.newStatus =
        $scope.applications[index].status;

    $scope.applications.splice(index, 1);

    localStorage.setItem(
        "applications",
        JSON.stringify($scope.applications)
    );

    $scope.totalApplications =
        $scope.applications.length;
};
});