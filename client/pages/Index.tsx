import { Search, Scale, FileText, Users, Building, Gavel, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Index() {
  const searchTypes = [
    {
      title: "Case Number Search",
      description: "Find cases by specific case number",
      icon: FileText,
      path: "/search/case-number",
      color: "text-blue-600"
    },
    {
      title: "Complainant Search",
      description: "Search cases by complainant name",
      icon: User,
      path: "/search/complainant",
      color: "text-green-600"
    },
    {
      title: "Respondent Search",
      description: "Find cases by respondent details",
      icon: Building,
      path: "/search/respondent",
      color: "text-purple-600"
    },
    {
      title: "Advocate Search",
      description: "Search by complainant or respondent advocate",
      icon: Scale,
      path: "/search/advocate",
      color: "text-orange-600"
    },
    {
      title: "Industry Type",
      description: "Find cases by specific industry category",
      icon: Building,
      path: "/search/industry",
      color: "text-red-600"
    },
    {
      title: "Judge Search",
      description: "Search cases by presiding judge",
      icon: Gavel,
      path: "/search/judge",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Scale className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Lexi</h1>
              <p className="text-sm text-slate-600">District Consumer Court Case Search</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Consumer Court Case Management
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Access and track District Consumer Court (DCDRC) cases across India. 
            Search by multiple criteria and get real-time case status updates from the Jagriti portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <Calendar className="h-5 w-5" />
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Users className="h-5 w-5" />
              <span>Multi-state coverage</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <FileText className="h-5 w-5" />
              <span>Detailed case information</span>
            </div>
          </div>
        </div>

        {/* Search Types Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
            Search Case Database
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchTypes.map((searchType, index) => {
              const IconComponent = searchType.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors`}>
                        <IconComponent className={`h-6 w-6 ${searchType.color}`} />
                      </div>
                      <CardTitle className="text-lg">{searchType.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{searchType.description}</CardDescription>
                    <Link to={searchType.path}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Search className="h-4 w-4 mr-2" />
                        Search Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Advanced Search</h4>
              <p className="text-slate-600">
                Multiple search criteria including case number, parties, advocates, and more
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Comprehensive Data</h4>
              <p className="text-slate-600">
                Complete case details including filing dates, parties, advocates, and document links
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                <Scale className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Legal Accuracy</h4>
              <p className="text-slate-600">
                Direct integration with official Jagriti portal ensuring data accuracy and compliance
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Ready to Start Searching?
          </h3>
          <p className="text-slate-600 mb-8">
            Choose your search method and find the cases you need in seconds
          </p>
          <Link to="/search/case-number">
            <Button size="lg" className="px-8">
              <Search className="h-5 w-5 mr-2" />
              Start Searching
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-6 w-6" />
            <span className="text-lg font-semibold">Lexi</span>
          </div>
          <p className="text-sm">
            AI-powered legal assistance for modern law practices
          </p>
        </div>
      </footer>
    </div>
  );
}
